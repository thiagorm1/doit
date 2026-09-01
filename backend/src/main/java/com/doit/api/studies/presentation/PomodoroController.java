package com.doit.api.studies.presentation;

import com.doit.api.studies.application.PomodoroService;
import com.doit.api.studies.application.dto.PomodoroMetricsResponseDTO;
import com.doit.api.studies.application.dto.PomodoroSessionRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/studies/pomodoro")
@CrossOrigin(origins = "*")
public class PomodoroController {

    private final PomodoroService pomodoroService;

    public PomodoroController(PomodoroService pomodoroService) {
        this.pomodoroService = pomodoroService;
    }

    @PostMapping
    public ResponseEntity<Void> completePomodoro(@RequestBody PomodoroSessionRequestDTO request) {
        pomodoroService.saveSession(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/metrics")
    public ResponseEntity<PomodoroMetricsResponseDTO> getMetrics() {
        PomodoroMetricsResponseDTO metrics = pomodoroService.getMetrics();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/metrics/detailed")
    public ResponseEntity<com.doit.api.studies.application.dto.PomodoroDetailedMetricsResponseDTO> getDetailedMetrics(
            @RequestParam(defaultValue = "week") String filter,
            @RequestParam(defaultValue = "0") int weeklyGoalHours) {
        
        com.doit.api.studies.application.dto.PomodoroDetailedMetricsResponseDTO metrics = 
            pomodoroService.getDetailedMetrics(filter, weeklyGoalHours);
            
        return ResponseEntity.ok(metrics);
    }
}
