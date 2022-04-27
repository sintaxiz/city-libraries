package ru.nsu.ccfit.citylibraries.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.citylibraries.backend.entities.Literature;
import ru.nsu.ccfit.citylibraries.backend.repositories.LiteratureRepository;

import java.util.List;

@Service
public class LiteratureService {
    private final LiteratureRepository repository;

    @Autowired
    public LiteratureService(LiteratureRepository repository) {
        this.repository = repository;
    }

    public List<Literature> getLiterature() {
        return repository.findAll();
    }
}
