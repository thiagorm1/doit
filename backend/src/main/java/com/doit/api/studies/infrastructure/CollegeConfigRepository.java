package com.doit.api.studies.infrastructure;

import com.doit.api.studies.domain.CollegeConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollegeConfigRepository extends JpaRepository<CollegeConfig, Long> {
}
