package com.doit.api.studies.application.dto.contest;

import java.time.LocalDate;

public class ContestConfigDTO {
    private String contestName;
    private String targetPosition;
    private LocalDate examDate;

    public String getContestName() { return contestName; }
    public void setContestName(String contestName) { this.contestName = contestName; }
    public String getTargetPosition() { return targetPosition; }
    public void setTargetPosition(String targetPosition) { this.targetPosition = targetPosition; }
    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }
}
