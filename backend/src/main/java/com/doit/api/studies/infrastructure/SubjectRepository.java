package com.doit.api.studies.infrastructure;

import com.doit.api.studies.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface SubjectRepository extends JpaRepository<Subject, UUID> {
}
