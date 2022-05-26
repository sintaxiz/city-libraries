package ru.nsu.ccfit.citylibraries.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.citylibraries.backend.dto.TopLiteratureInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Literature;
import ru.nsu.ccfit.citylibraries.backend.entities.Publication;
import ru.nsu.ccfit.citylibraries.backend.repositories.LiteratureRepository;
import ru.nsu.ccfit.citylibraries.backend.repositories.PublicationRepository;

import java.util.List;

@Service
public class LiteratureService {
    private final LiteratureRepository literatureRepository;
    private final PublicationRepository publicationRepository;

    @Autowired
    public LiteratureService(LiteratureRepository repository, PublicationRepository publicationRepository) {
        this.literatureRepository = repository;
        this.publicationRepository = publicationRepository;
    }

    public List<Literature> getLiterature() {
        return literatureRepository.findAll();
    }

    public List<TopLiteratureInfo> getTopLiterature() {
        return literatureRepository.getTop();
    }

    public List<Publication> getPublications(Integer id) {
        return publicationRepository.findAllById(literatureRepository.getPublications(id));
    }
}
