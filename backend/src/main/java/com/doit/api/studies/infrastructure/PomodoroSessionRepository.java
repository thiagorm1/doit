package com.doit.api.studies.infrastructure;

import com.doit.api.studies.domain.PomodoroSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PomodoroSessionRepository extends JpaRepository<PomodoroSession, Long> {
    List<PomodoroSession> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(p.cycles) FROM PomodoroSession p")
    Long sumAllCycles();
}
