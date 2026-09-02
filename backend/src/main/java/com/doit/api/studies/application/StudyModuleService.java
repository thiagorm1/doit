package com.doit.api.studies.application;

import com.doit.api.studies.domain.StudyModule;
import com.doit.api.studies.domain.StudyModuleRepository;
import com.doit.api.studies.domain.StudyContent;
import com.doit.api.studies.domain.StudyContentRepository;
import com.doit.api.studies.application.dto.module.StudyModuleDTO;
import com.doit.api.studies.application.dto.module.StudyContentDTO;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudyModuleService {
    private final StudyModuleRepository repository;
    private final StudyContentRepository contentRepository;

    public StudyModuleService(StudyModuleRepository repository, StudyContentRepository contentRepository) {
        this.repository = repository;
        this.contentRepository = contentRepository;
    }

    public List<StudyModuleDTO> getAll() {
        return repository.findAll().stream().map(m -> {
            StudyModuleDTO dto = new StudyModuleDTO();
            dto.setId(m.getId());
            dto.setName(m.getName());
            dto.setIcon(m.getIcon());
            
            List<StudyContentDTO> cDtos = contentRepository.findByModuleId(m.getId()).stream().map(c -> {
                StudyContentDTO cd = new StudyContentDTO();
                cd.setId(c.getId());
                cd.setModuleId(c.getModuleId());
                cd.setTitle(c.getTitle());
                cd.setNotes(c.getNotes());
                cd.setMindmap(c.getMindmap());
                return cd;
            }).collect(Collectors.toList());
            dto.setContents(cDtos);
            
            return dto;
        }).collect(Collectors.toList());
    }

    public StudyModuleDTO save(StudyModuleDTO dto) {
        StudyModule module = new StudyModule();
        if (dto.getId() != null) {
            module = repository.findById(dto.getId()).orElse(new StudyModule());
        }
        module.setName(dto.getName());
        module.setIcon(dto.getIcon() != null ? dto.getIcon() : "folder");
        module = repository.save(module);
        
        dto.setId(module.getId());
        return dto;
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }
    
    public StudyContentDTO saveContent(StudyContentDTO dto) {
        StudyContent content = new StudyContent();
        if (dto.getId() != null) {
            content = contentRepository.findById(dto.getId()).orElse(new StudyContent());
        }
        content.setModuleId(dto.getModuleId());
        content.setTitle(dto.getTitle());
        content.setNotes(dto.getNotes());
        content.setMindmap(dto.getMindmap());
        content = contentRepository.save(content);
        dto.setId(content.getId());
        return dto;
    }
    
    public void deleteContent(UUID id) {
        contentRepository.deleteById(id);
    }
}
