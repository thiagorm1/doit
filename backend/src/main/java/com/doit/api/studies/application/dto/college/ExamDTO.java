package com.doit.api.studies.application.dto.college;

import java.time.LocalDate;

public class ExamDTO {
    private Long id;
    private String title;
    private LocalDate examDate;
    private Double grade;
    private int semester;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }
    public Double getGrade() { return grade; }
    public void setGrade(Double grade) { this.grade = grade; }
    public int getSemester() { return semester; }
    public void setSemester(int semester) { this.semester = semester; }
}
