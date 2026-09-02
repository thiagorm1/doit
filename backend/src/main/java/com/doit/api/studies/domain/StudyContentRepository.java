package com.doit.api.studies.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface StudyContentRepository extends JpaRepository<StudyContent, UUID> {
    List<StudyContent> findByModuleId(UUID moduleId);
}
