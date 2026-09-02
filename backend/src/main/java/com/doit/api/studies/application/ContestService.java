package com.doit.api.studies.application;

import com.doit.api.studies.domain.ContestConfig;
import com.doit.api.studies.domain.ContestConfigRepository;
import com.doit.api.studies.application.dto.contest.ContestConfigDTO;
import org.springframework.stereotype.Service;

@Service
public class ContestService {
    private final ContestConfigRepository repository;

    public ContestService(ContestConfigRepository repository) {
        this.repository = repository;
    }

    public ContestConfigDTO getConfig() {
        ContestConfig config = repository.findAll().stream().findFirst().orElse(new ContestConfig());
        ContestConfigDTO dto = new ContestConfigDTO();
        dto.setContestName(config.getContestName());
        dto.setTargetPosition(config.getTargetPosition());
        dto.setExamDate(config.getExamDate());
        return dto;
    }

    public void updateConfig(ContestConfigDTO dto) {
        ContestConfig config = repository.findAll().stream().findFirst().orElse(new ContestConfig());
        config.setContestName(dto.getContestName());
        config.setTargetPosition(dto.getTargetPosition());
        config.setExamDate(dto.getExamDate());
        repository.save(config);
    }
}
