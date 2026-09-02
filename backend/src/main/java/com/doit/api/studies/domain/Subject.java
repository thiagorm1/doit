package com.doit.api.studies.domain;

import com.doit.api.studies.domain.enums.SubjectGrade;
import com.doit.api.studies.domain.enums.SubjectStatus;
import jakarta.persistence.*;
import jakarta.persistence.EntityListeners;
import java.util.UUID;

@Entity
@Table(name = "college_subjects")
@EntityListeners(com.doit.api.studies.infrastructure.sync.EntitySyncListener.class)
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubjectStatus status;

    @Enumerated(EnumType.STRING)
    private SubjectGrade grade; // Only for COMPLETED

    private Integer semesterTaken; // Only for COMPLETED

    private String professor;

    private String schedule; // e.g. 19:00 - 20:40

    private String days; // e.g. Seg, Qua

    public Subject() {}

    public Subject(String name, SubjectStatus status, SubjectGrade grade, Integer semesterTaken, String professor, String schedule, String days) {
        this.name = name;
        this.status = status;
        this.grade = grade;
        this.semesterTaken = semesterTaken;
        this.professor = professor;
        this.schedule = schedule;
        this.days = days;
    }

    public UUID getId() { return id; }
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
