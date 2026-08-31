package com.doit.api.studies.application.dto.module;

public class StudyContentDTO {
    private Long id;
    private Long moduleId;
    private String title;
    private String notes;
    private String mindmap;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getModuleId() { return moduleId; }
    public void setModuleId(Long moduleId) { this.moduleId = moduleId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getMindmap() { return mindmap; }
    public void setMindmap(String mindmap) { this.mindmap = mindmap; }
}
