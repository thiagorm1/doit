package com.doit.api.studies.infrastructure.sync;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import org.springframework.core.env.Environment;

public class EntitySyncListener {

    private static final ThreadLocal<Boolean> syncInProgress = ThreadLocal.withInitial(() -> false);

    public static void setSyncInProgress(boolean inProgress) {
        syncInProgress.set(inProgress);
    }

    @PostPersist
    public void onPostPersist(Object entity) {
        handleEvent(entity, "INSERT");
    }

    @PostUpdate
    public void onPostUpdate(Object entity) {
        handleEvent(entity, "UPDATE");
    }

    @PostRemove
    public void onPostRemove(Object entity) {
        handleEvent(entity, "DELETE");
    }

    private void handleEvent(Object entity, String operation) {
        if (syncInProgress.get()) {
            return; // Evita loop infinito: mudanças aplicadas pela sincronização não geram novos eventos.
        }

        try {
            SupabaseSyncClient client = SpringContext.getBean(SupabaseSyncClient.class);
            ObjectMapper objectMapper = SpringContext.getBean(ObjectMapper.class);
            Environment env = SpringContext.getBean(Environment.class);
            String pcId = env.getProperty("app.pc-id", "UNKNOWN");

            String payload = objectMapper.writeValueAsString(entity);
            String entityName = entity.getClass().getSimpleName();

            SyncEvent event = new SyncEvent(entityName, operation, payload, pcId);
            
            // Envia de forma assíncrona para não bloquear a thread principal
            Thread.ofVirtual().start(() -> {
                try {
                    client.publishEvent(event);
                } catch (Exception e) {
                    System.err.println("Erro ao publicar evento de sync: " + e.getMessage());
                }
            });

        } catch (JsonProcessingException | NullPointerException e) {
            System.err.println("Erro ao processar EntitySyncListener: " + e.getMessage());
        }
    }
}
