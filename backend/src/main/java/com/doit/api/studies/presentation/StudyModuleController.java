package com.doit.api.studies.presentation;

import com.doit.api.studies.application.StudyModuleService;
import com.doit.api.studies.application.dto.module.StudyModuleDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/studies/modules")
@CrossOrigin(origins = "*")
public class StudyModuleController {
    private final StudyModuleService service;

    public StudyModuleController(StudyModuleService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<StudyModuleDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<StudyModuleDTO> save(@RequestBody StudyModuleDTO dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/contents")
    public ResponseEntity<com.doit.api.studies.application.dto.module.StudyContentDTO> saveContent(@RequestBody com.doit.api.studies.application.dto.module.StudyContentDTO dto) {
        return ResponseEntity.ok(service.saveContent(dto));
    }

    @DeleteMapping("/contents/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        service.deleteContent(id);
        return ResponseEntity.ok().build();
    }
}
