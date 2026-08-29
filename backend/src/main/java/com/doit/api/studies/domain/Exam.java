package com.doit.api.studies.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "college_exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }
    public Double getGrade() { return grade; }
    public void setGrade(Double grade) { this.grade = grade; }
    public int getSemester() { return semester; }
    public void setSemester(int semester) { this.semester = semester; }
}
