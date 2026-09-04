package com.doit.api.studies.domain;

import jakarta.persistence.*;
import jakarta.persistence.EntityListeners;
import java.util.UUID;

@Entity
@Table(name = "study_modules")
@EntityListeners(com.doit.api.studies.infrastructure.sync.EntitySyncListener.class)
public class StudyModule {
    @Id
    private UUID id = UUID.randomUUID();
    private String name;
    private String icon = "folder";

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
