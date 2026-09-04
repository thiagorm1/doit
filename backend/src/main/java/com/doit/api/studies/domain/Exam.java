package com.doit.api.studies.domain;

import jakarta.persistence.*;
import jakarta.persistence.EntityListeners;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "college_exams")
@EntityListeners(com.doit.api.studies.infrastructure.sync.EntitySyncListener.class)
public class Exam {

    @Id
    private UUID id = UUID.randomUUID();

    @Column(nullable = false)
    private String title; // Usually "Subject Name" or "Subject - Midterm"

    @Column(nullable = false)
    private LocalDate examDate;

    private Double grade; // 0 to 10

    @Column(nullable = false)
    private int semester;

    public Exam() {}

    public Exam(String title, LocalDate examDate, Double grade, int semester) {
        this.title = title;
        this.examDate = examDate;
        this.grade = grade;
        this.semester = semester;
    }

    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }
    public Double getGrade() { return grade; }
    public void setGrade(Double grade) { this.grade = grade; }
    public int getSemester() { return semester; }
    public void setSemester(int semester) { this.semester = semester; }
}
