package com.doit.api.studies.presentation;

import com.doit.api.studies.application.StudyModuleService;
import com.doit.api.studies.application.dto.module.StudyModuleDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;
import com.doit.api.studies.application.dto.module.StudyContentDTO;

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
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/contents")
    public ResponseEntity<StudyContentDTO> saveContent(@RequestBody StudyContentDTO dto) {
        return ResponseEntity.ok(service.saveContent(dto));
    }

    @DeleteMapping("/contents/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable UUID id) {
        service.deleteContent(id);
        return ResponseEntity.ok().build();
    }
}
