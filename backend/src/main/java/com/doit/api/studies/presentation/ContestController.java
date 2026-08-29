package com.doit.api.studies.presentation;

import com.doit.api.studies.application.ContestService;
import com.doit.api.studies.application.dto.contest.ContestConfigDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/studies/contest")
@CrossOrigin(origins = "*")
public class ContestController {
    private final ContestService service;

    public ContestController(ContestService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ContestConfigDTO> getConfig() {
        return ResponseEntity.ok(service.getConfig());
    }

    @PostMapping
    public ResponseEntity<Void> updateConfig(@RequestBody ContestConfigDTO dto) {
        service.updateConfig(dto);
        return ResponseEntity.ok().build();
    }
}
