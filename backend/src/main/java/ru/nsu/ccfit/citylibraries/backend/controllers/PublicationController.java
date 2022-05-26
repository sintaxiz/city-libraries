package ru.nsu.ccfit.citylibraries.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.ccfit.citylibraries.backend.entities.Publication;
import ru.nsu.ccfit.citylibraries.backend.services.PublicationService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/publications")
public class PublicationController {
    private final PublicationService service;

    @Autowired
    public PublicationController(PublicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Publication> getPublications() {
        return service.getPublications();
    }

    @GetMapping(path = "/{id}")
    public Optional<Publication> getPublication(@PathVariable Integer id) {
        return service.getPublication(id);
    }
}
