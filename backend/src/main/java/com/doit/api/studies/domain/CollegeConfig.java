package com.doit.api.studies.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "college_configs")
public class CollegeConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int currentSemester;
    private int graduationSemester;

    public CollegeConfig() {}

    public CollegeConfig(int currentSemester, int graduationSemester) {
        this.currentSemester = currentSemester;
        this.graduationSemester = graduationSemester;
    }

    public Long getId() { return id; }
    public int getCurrentSemester() { return currentSemester; }
    public void setCurrentSemester(int currentSemester) { this.currentSemester = currentSemester; }
    public int getGraduationSemester() { return graduationSemester; }
    public void setGraduationSemester(int graduationSemester) { this.graduationSemester = graduationSemester; }
}
