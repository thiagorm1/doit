package com.doit.api.studies.infrastructure;

import com.doit.api.studies.domain.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ExamRepository extends JpaRepository<Exam, UUID> {
}
