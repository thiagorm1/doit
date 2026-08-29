package com.doit.api.studies.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContestConfigRepository extends JpaRepository<ContestConfig, Long> {}
