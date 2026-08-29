package com.doit.api.studies.application.dto.college;

public class CollegeConfigDTO {
    private int currentSemester;
    private int graduationSemester;

    public int getCurrentSemester() { return currentSemester; }
    public void setCurrentSemester(int currentSemester) { this.currentSemester = currentSemester; }
    public int getGraduationSemester() { return graduationSemester; }
    public void setGraduationSemester(int graduationSemester) { this.graduationSemester = graduationSemester; }
}
