package com.doit.api.studies.infrastructure.sync;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class SyncWorker {

    private final SupabaseSyncClient syncClient;
    private final ObjectMapper objectMapper;
    private final EntityManager entityManager;

    public SyncWorker(SupabaseSyncClient syncClient, ObjectMapper objectMapper, EntityManager entityManager) {
        this.syncClient = syncClient;
        this.objectMapper = objectMapper;
        this.entityManager = entityManager;
    }

    @Scheduled(fixedDelay = 5000) // Roda a cada 5 segundos
    @Transactional
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

                    if ("DELETE".equals(event.getOperation())) {
                        Object managedEntity = entityManager.merge(entity);
                        entityManager.remove(managedEntity);
                    } else { // INSERT ou UPDATE
                        entityManager.merge(entity);
                    }

                    // Se aplicou com sucesso, remove do Supabase
                    syncClient.deleteEvent(event.getId());
                    System.out.println("Evento sincronizado com sucesso: " + event.getEntityName());

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
}
