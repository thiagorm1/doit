package com.doit.api.studies.presentation;

import com.doit.api.studies.application.CollegeService;
import com.doit.api.studies.application.dto.college.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/studies/college")
@CrossOrigin(origins = "*")
public class CollegeController {

    private final CollegeService collegeService;

    public CollegeController(CollegeService collegeService) {
        this.collegeService = collegeService;
    }

    @GetMapping
    public ResponseEntity<CollegeDataDTO> getCollegeData() {
        return ResponseEntity.ok(collegeService.getCollegeData());
    }

    @PostMapping("/config")
    public ResponseEntity<Void> updateConfig(@RequestBody CollegeConfigDTO dto) {
        collegeService.saveConfig(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/subjects")
    public ResponseEntity<SubjectDTO> saveSubject(@RequestBody SubjectDTO dto) {
        return ResponseEntity.ok(collegeService.saveSubject(dto));
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        collegeService.deleteSubject(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/exams")
    public ResponseEntity<ExamDTO> saveExam(@RequestBody ExamDTO dto) {
        return ResponseEntity.ok(collegeService.saveExam(dto));
    }

    @DeleteMapping("/exams/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        collegeService.deleteExam(id);
        return ResponseEntity.ok().build();
    }
}
