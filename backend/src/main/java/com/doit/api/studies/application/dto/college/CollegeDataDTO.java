package com.doit.api.studies.application.dto.college;

import java.util.List;

public class CollegeDataDTO {
    private CollegeConfigDTO config;
    private List<SubjectDTO> subjects;
    private List<ExamDTO> exams;

    public CollegeDataDTO(CollegeConfigDTO config, List<SubjectDTO> subjects, List<ExamDTO> exams) {
        this.config = config;
        this.subjects = subjects;
        this.exams = exams;
    }

    public CollegeConfigDTO getConfig() { return config; }
    public List<SubjectDTO> getSubjects() { return subjects; }
    public List<ExamDTO> getExams() { return exams; }
}
