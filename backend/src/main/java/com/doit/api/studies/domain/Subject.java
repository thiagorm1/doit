package com.doit.api.studies.domain;

import com.doit.api.studies.domain.enums.SubjectGrade;
import com.doit.api.studies.domain.enums.SubjectStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "college_subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubjectStatus status;

    @Enumerated(EnumType.STRING)
    private SubjectGrade grade; // Only for COMPLETED

    private Integer semesterTaken; // Only for COMPLETED

    public Subject() {}

    public Subject(String name, SubjectStatus status, SubjectGrade grade, Integer semesterTaken) {
        this.name = name;
        this.status = status;
        this.grade = grade;
        this.semesterTaken = semesterTaken;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public SubjectStatus getStatus() { return status; }
    public void setStatus(SubjectStatus status) { this.status = status; }
    public SubjectGrade getGrade() { return grade; }
    public void setGrade(SubjectGrade grade) { this.grade = grade; }
    public Integer getSemesterTaken() { return semesterTaken; }
    public void setSemesterTaken(Integer semesterTaken) { this.semesterTaken = semesterTaken; }
}
