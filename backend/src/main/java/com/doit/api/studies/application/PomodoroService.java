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

    @Transactional(readOnly = true)
    public com.doit.api.studies.application.dto.PomodoroDetailedMetricsResponseDTO getDetailedMetrics(String filter, int weeklyGoalHours) {
        List<PomodoroSession> allSessions = repository.findAll();
        LocalDateTime now = LocalDateTime.now();
        
        // Calculate today's focus time
        long todayFocusTime = allSessions.stream()
            .filter(s -> s.getCreatedAt().toLocalDate().isEqual(now.toLocalDate()))
            .mapToLong(PomodoroSession::getTotalFocusTime)
            .sum();
            
        if (allSessions.isEmpty()) {
            return new com.doit.api.studies.application.dto.PomodoroDetailedMetricsResponseDTO(0, 0, 0, 0, todayFocusTime);
        }

        // Determine filter start date
        LocalDateTime startDate;
        switch (filter.toLowerCase()) {
            case "week":
                // Start of week (Sunday)
                int daysToSubtract = now.getDayOfWeek().getValue() % 7; // Sunday=0, Monday=1, etc.
                startDate = now.minusDays(daysToSubtract).withHour(0).withMinute(0).withSecond(0);
                break;
            case "month":
                startDate = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
                break;
            case "year":
                startDate = now.withDayOfYear(1).withHour(0).withMinute(0).withSecond(0);
                break;
            default:
                startDate = allSessions.stream().map(PomodoroSession::getCreatedAt).min(LocalDateTime::compareTo).orElse(now);
                break;
        }

        List<PomodoroSession> filtered = allSessions.stream()
            .filter(s -> !s.getCreatedAt().isBefore(startDate))
            .toList();

        if (filtered.isEmpty()) {
            return new com.doit.api.studies.application.dto.PomodoroDetailedMetricsResponseDTO(0, 0, 0, 0, todayFocusTime);
        }

        long totalSessions = filtered.size();
        long totalFocusTime = filtered.stream().mapToLong(PomodoroSession::getTotalFocusTime).sum();
        long totalBreakTime = filtered.stream().mapToLong(PomodoroSession::getTotalBreakTime).sum();
        
        long daysSinceFirst = ChronoUnit.DAYS.between(startDate.toLocalDate(), now.toLocalDate()) + 1;
        int avgFocusPerDay = (int) (totalFocusTime / daysSinceFirst);
        int avgBreakPerDay = (int) (totalBreakTime / daysSinceFirst);

        // Calculate weeks goal met
        int weeksGoalMet = 0;
        if (weeklyGoalHours > 0) {
            java.util.Map<Integer, Long> weekFocusMap = new java.util.HashMap<>();
            java.time.temporal.WeekFields weekFields = java.time.temporal.WeekFields.of(java.util.Locale.getDefault()); // usually Sunday based in many locales
            
            for (PomodoroSession s : filtered) {
                int weekNum = s.getCreatedAt().get(weekFields.weekOfYear());
                int year = s.getCreatedAt().getYear();
                int key = year * 100 + weekNum;
                weekFocusMap.put(key, weekFocusMap.getOrDefault(key, 0L) + s.getTotalFocusTime());
            }
            
            long goalMinutes = weeklyGoalHours * 60L;
            for (Long focusTime : weekFocusMap.values()) {
                if (focusTime >= goalMinutes) {
                    weeksGoalMet++;
                }
            }
        }

        return new com.doit.api.studies.application.dto.PomodoroDetailedMetricsResponseDTO(
            totalSessions, avgFocusPerDay, avgBreakPerDay, weeksGoalMet, todayFocusTime
        );
    }
}
