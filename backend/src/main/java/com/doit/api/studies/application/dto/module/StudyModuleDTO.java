package com.doit.api.studies.application.dto.module;

public class StudyModuleDTO {
    private Long id;
    private String name;
    private String icon;
    private java.util.List<StudyContentDTO> contents = new java.util.ArrayList<>();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public java.util.List<StudyContentDTO> getContents() { return contents; }
    public void setContents(java.util.List<StudyContentDTO> contents) { this.contents = contents; }
}
