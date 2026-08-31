package com.doit.api.studies.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudyContentRepository extends JpaRepository<StudyContent, Long> {
    List<StudyContent> findByModuleId(Long moduleId);
}
