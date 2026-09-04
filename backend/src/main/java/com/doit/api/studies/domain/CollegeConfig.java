package com.doit.api.studies.domain;

import jakarta.persistence.*;
import jakarta.persistence.EntityListeners;
import java.util.UUID;

@Entity
@Table(name = "college_configs")
@EntityListeners(com.doit.api.studies.infrastructure.sync.EntitySyncListener.class)
public class CollegeConfig {

    @Id
    private UUID id = UUID.randomUUID();

    private int currentSemester;
    private int graduationSemester;

    public CollegeConfig() {}

    public CollegeConfig(int currentSemester, int graduationSemester) {
        this.currentSemester = currentSemester;
        this.graduationSemester = graduationSemester;
    }

    public UUID getId() { return id; }
    public int getCurrentSemester() { return currentSemester; }
    public void setCurrentSemester(int currentSemester) { this.currentSemester = currentSemester; }
    public int getGraduationSemester() { return graduationSemester; }
    public void setGraduationSemester(int graduationSemester) { this.graduationSemester = graduationSemester; }
}
