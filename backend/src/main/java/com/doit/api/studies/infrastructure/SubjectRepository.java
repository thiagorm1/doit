package com.doit.api.studies.infrastructure;

import com.doit.api.studies.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
