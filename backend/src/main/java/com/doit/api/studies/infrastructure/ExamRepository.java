package com.doit.api.studies.infrastructure;

import com.doit.api.studies.domain.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {
}
