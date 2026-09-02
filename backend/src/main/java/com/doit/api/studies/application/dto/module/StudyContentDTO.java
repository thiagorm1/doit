package com.doit.api.studies.application.dto.module;

import java.util.UUID;

public class StudyContentDTO {
    private UUID id;
    private UUID moduleId;
    private String title;
    private String notes;
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
