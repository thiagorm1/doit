package com.doit.api.studies.application.dto.college;

import com.doit.api.studies.domain.enums.SubjectGrade;
import com.doit.api.studies.domain.enums.SubjectStatus;
import java.util.UUID;

public class SubjectDTO {
    private UUID id;
    private String name;
    private SubjectStatus status;
    private SubjectGrade grade;
    private Integer semesterTaken;
    private String professor;
    private String schedule;
    private String days;

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public SubjectStatus getStatus() { return status; }
    public void setStatus(SubjectStatus status) { this.status = status; }
    public SubjectGrade getGrade() { return grade; }
    public void setGrade(SubjectGrade grade) { this.grade = grade; }
    public Integer getSemesterTaken() { return semesterTaken; }
    public void setSemesterTaken(Integer semesterTaken) { this.semesterTaken = semesterTaken; }
    public String getProfessor() { return professor; }
    public void setProfessor(String professor) { this.professor = professor; }
    public String getSchedule() { return schedule; }
    public void setSchedule(String schedule) { this.schedule = schedule; }
    public String getDays() { return days; }
    public void setDays(String days) { this.days = days; }
}
