package com.doit.api.studies.application;

import com.doit.api.studies.application.dto.college.*;
import com.doit.api.studies.domain.CollegeConfig;
import com.doit.api.studies.domain.Exam;
import com.doit.api.studies.domain.Subject;
import com.doit.api.studies.infrastructure.CollegeConfigRepository;
import com.doit.api.studies.infrastructure.ExamRepository;
import com.doit.api.studies.infrastructure.SubjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollegeService {

    private final CollegeConfigRepository configRepository;
    private final SubjectRepository subjectRepository;
    private final ExamRepository examRepository;

    public CollegeService(CollegeConfigRepository configRepository, SubjectRepository subjectRepository, ExamRepository examRepository) {
        this.configRepository = configRepository;
        this.subjectRepository = subjectRepository;
        this.examRepository = examRepository;
    }

    @Transactional(readOnly = true)
    public CollegeDataDTO getCollegeData() {
        CollegeConfig config = configRepository.findAll().stream().findFirst()
                .orElse(new CollegeConfig(1, 8)); // default

        CollegeConfigDTO configDTO = new CollegeConfigDTO();
        configDTO.setCurrentSemester(config.getCurrentSemester());
        configDTO.setGraduationSemester(config.getGraduationSemester());

        List<SubjectDTO> subjectDTOs = subjectRepository.findAll().stream().map(s -> {
            SubjectDTO dto = new SubjectDTO();
            dto.setId(s.getId());
            dto.setName(s.getName());
            dto.setStatus(s.getStatus());
            dto.setGrade(s.getGrade());
            dto.setSemesterTaken(s.getSemesterTaken());
            dto.setProfessor(s.getProfessor());
            dto.setSchedule(s.getSchedule());
            return dto;
        }).collect(Collectors.toList());

        List<ExamDTO> examDTOs = examRepository.findAll().stream().map(e -> {
            ExamDTO dto = new ExamDTO();
            dto.setId(e.getId());
            dto.setTitle(e.getTitle());
            dto.setExamDate(e.getExamDate());
            dto.setGrade(e.getGrade());
            dto.setSemester(e.getSemester());
            return dto;
        }).collect(Collectors.toList());

        return new CollegeDataDTO(configDTO, subjectDTOs, examDTOs);
    }

    @Transactional
    public void saveConfig(CollegeConfigDTO dto) {
        CollegeConfig config = configRepository.findAll().stream().findFirst()
                .orElse(new CollegeConfig());
        config.setCurrentSemester(dto.getCurrentSemester());
        config.setGraduationSemester(dto.getGraduationSemester());
        configRepository.save(config);
    }

    @Transactional
    public SubjectDTO saveSubject(SubjectDTO dto) {
        Subject subject = dto.getId() != null ? subjectRepository.findById(dto.getId()).orElse(new Subject()) : new Subject();
        subject.setName(dto.getName());
        subject.setStatus(dto.getStatus());
        subject.setGrade(dto.getGrade());
        subject.setSemesterTaken(dto.getSemesterTaken());
        subject.setProfessor(dto.getProfessor());
        subject.setSchedule(dto.getSchedule());
        subject = subjectRepository.save(subject);
        
        dto.setId(subject.getId());
        return dto;
    }

    @Transactional
    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }

    @Transactional
    public ExamDTO saveExam(ExamDTO dto) {
        Exam exam = dto.getId() != null ? examRepository.findById(dto.getId()).orElse(new Exam()) : new Exam();
        exam.setTitle(dto.getTitle());
        exam.setExamDate(dto.getExamDate());
        exam.setGrade(dto.getGrade());
        exam.setSemester(dto.getSemester());
        exam = examRepository.save(exam);

        dto.setId(exam.getId());
        return dto;
    }

    @Transactional
    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }
}
