package com.doit.api.studies.infrastructure.sync;

import java.time.Instant;
import java.util.UUID;

public class SyncEvent {
    private UUID id;
    @com.fasterxml.jackson.annotation.JsonProperty("entity_name")
    private String entityName;
    private String operation; // "INSERT", "UPDATE", "DELETE"
    private String payload; // JSON string
    @com.fasterxml.jackson.annotation.JsonProperty("source_pc")
    private String sourcePc;
    @com.fasterxml.jackson.annotation.JsonProperty("created_at")
    private Instant createdAt;

    public SyncEvent() {}

    public SyncEvent(String entityName, String operation, String payload, String sourcePc) {
        this.entityName = entityName;
        this.operation = operation;
        this.payload = payload;
        this.sourcePc = sourcePc;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getEntityName() { return entityName; }
    public void setEntityName(String entityName) { this.entityName = entityName; }

    public String getOperation() { return operation; }
    public void setOperation(String operation) { this.operation = operation; }

    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }

    public String getSourcePc() { return sourcePc; }
    public void setSourcePc(String sourcePc) { this.sourcePc = sourcePc; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
