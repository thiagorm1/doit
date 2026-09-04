package com.doit.api.studies.infrastructure.sync;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.lang.reflect.Method;
import java.util.List;

@Component
public class SyncWorker {

    private final SupabaseSyncClient syncClient;
    private final ObjectMapper objectMapper;
    private final TransactionTemplate transactionTemplate;

    @PersistenceContext
    private EntityManager entityManager;

    public SyncWorker(SupabaseSyncClient syncClient, ObjectMapper objectMapper, PlatformTransactionManager transactionManager) {
        this.syncClient = syncClient;
        this.objectMapper = objectMapper;
        this.transactionTemplate = new TransactionTemplate(transactionManager);
    }

    @Scheduled(fixedDelay = 5000) // Roda a cada 5 segundos
    public void processPendingSyncEvents() {
        try {
            List<SyncEvent> events = syncClient.fetchPendingEvents();
            if (events == null || events.isEmpty()) {
                return;
            }

            // Desativa a interceptação para não reenviar os eventos que estamos recebendo
            EntitySyncListener.setSyncInProgress(true);

            for (SyncEvent event : events) {
                try {
                    Class<?> entityClass = Class.forName("com.doit.api.studies.domain." + event.getEntityName());
                    Object entity = objectMapper.readValue(event.getPayload(), entityClass);

                    transactionTemplate.execute(status -> {
                        if ("DELETE".equals(event.getOperation())) {
                            Object id = getEntityId(entity);
                            if (id != null) {
                                Object existing = entityManager.find(entityClass, id);
                                if (existing != null) {
                                    entityManager.remove(existing);
                                }
                            } else {
                                Object managedEntity = entityManager.merge(entity);
                                entityManager.remove(managedEntity);
                            }
                        } else { // INSERT ou UPDATE
                            entityManager.merge(entity);
                        }
                        return null;
                    });

                    // Se aplicou com sucesso, remove do Supabase
                    syncClient.deleteEvent(event.getId());
                    System.out.println("Evento sincronizado com sucesso: " + event.getEntityName() + " (" + event.getOperation() + ")");

                } catch (Exception e) {
                    System.err.println("Erro ao processar evento " + event.getId() + ": " + e.getMessage());
                }
            }
        } catch (Exception e) {
            System.err.println("Erro na rotina de sincronização: " + e.getMessage());
        } finally {
            EntitySyncListener.setSyncInProgress(false);
        }
    }

    private Object getEntityId(Object entity) {
        try {
            Method getIdMethod = entity.getClass().getMethod("getId");
            return getIdMethod.invoke(entity);
        } catch (Exception e) {
            return null;
        }
    }
}
