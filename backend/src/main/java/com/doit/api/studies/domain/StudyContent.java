package com.doit.api.studies.domain;

import jakarta.persistence.*;
import jakarta.persistence.EntityListeners;
import java.util.UUID;

@Entity
@Table(name = "study_contents")
@EntityListeners(com.doit.api.studies.infrastructure.sync.EntitySyncListener.class)
public class StudyContent {
    @Id
    private UUID id = UUID.randomUUID();
    
    private UUID moduleId;
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @Column(columnDefinition = "TEXT")
    private String mindmap;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getModuleId() { return moduleId; }
    public void setModuleId(UUID moduleId) { this.moduleId = moduleId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getMindmap() { return mindmap; }
    public void setMindmap(String mindmap) { this.mindmap = mindmap; }
}
