package com.doit.api.studies.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "contest_config")
public class ContestConfig {
    @Id
    private Long id = 1L;
    private String contestName;
    private String targetPosition;
    private LocalDate examDate;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContestName() { return contestName; }
    public void setContestName(String contestName) { this.contestName = contestName; }
    public String getTargetPosition() { return targetPosition; }
    public void setTargetPosition(String targetPosition) { this.targetPosition = targetPosition; }
    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }
}
