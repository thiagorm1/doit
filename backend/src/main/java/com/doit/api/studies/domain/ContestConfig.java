package com.doit.api.studies.domain;

import jakarta.persistence.EntityListeners;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "contest_config")
@EntityListeners(com.doit.api.studies.infrastructure.sync.EntitySyncListener.class)
public class ContestConfig {
    @Id
    private UUID id = UUID.randomUUID();
    private String contestName;
    private String targetPosition;
    private LocalDate examDate;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getContestName() { return contestName; }
    public void setContestName(String contestName) { this.contestName = contestName; }
    public String getTargetPosition() { return targetPosition; }
    public void setTargetPosition(String targetPosition) { this.targetPosition = targetPosition; }
    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }
}
