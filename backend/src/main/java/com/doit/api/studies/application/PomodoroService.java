package com.doit.api.studies.application;

import com.doit.api.studies.application.dto.PomodoroMetricsResponseDTO;
import com.doit.api.studies.application.dto.PomodoroSessionRequestDTO;
import com.doit.api.studies.domain.PomodoroSession;
import com.doit.api.studies.infrastructure.PomodoroSessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class PomodoroService {

    private final PomodoroSessionRepository repository;

    public PomodoroService(PomodoroSessionRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public PomodoroSession saveSession(PomodoroSessionRequestDTO dto) {
        PomodoroSession session = new PomodoroSession(
                dto.getFocusTime(),
                dto.getShortBreak(),
                dto.getLongBreak(),
                dto.getCycles(),
                LocalDateTime.now()
        );
        return repository.save(session);
    }

    @Transactional(readOnly = true)
    public PomodoroMetricsResponseDTO getMetrics() {
        List<PomodoroSession> allSessions = repository.findAll();
        if (allSessions.isEmpty()) {
            return new PomodoroMetricsResponseDTO(0, 0, 0);
        }

        long totalCycles = allSessions.stream().mapToLong(PomodoroSession::getCycles).sum();
        
        long totalFocusTime = allSessions.stream().mapToLong(PomodoroSession::getTotalFocusTime).sum();
        long totalBreakTime = allSessions.stream().mapToLong(PomodoroSession::getTotalBreakTime).sum();

        LocalDateTime firstSessionDate = allSessions.stream()
                .map(PomodoroSession::getCreatedAt)
                .min(LocalDateTime::compareTo)
                .orElse(LocalDateTime.now());
                
        long daysSinceFirst = ChronoUnit.DAYS.between(firstSessionDate.toLocalDate(), LocalDateTime.now().toLocalDate()) + 1;

        int avgFocusPerDay = (int) (totalFocusTime / daysSinceFirst);
        int avgBreakPerDay = (int) (totalBreakTime / daysSinceFirst);

        return new PomodoroMetricsResponseDTO(totalCycles, avgFocusPerDay, avgBreakPerDay);
    }
}
