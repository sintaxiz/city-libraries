package ru.nsu.ccfit.citylibraries.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.citylibraries.backend.entities.Publication;
import ru.nsu.ccfit.citylibraries.backend.repositories.PublicationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PublicationService {
    private final PublicationRepository repository;

    @Autowired
    public PublicationService(PublicationRepository repository) {
        this.repository = repository;
    }

    public List<Publication> getPublications() {
        return repository.findAll();
    }

    public Optional<Publication> getPublication(Integer id) {
        return repository.findById(id);
    }
}
