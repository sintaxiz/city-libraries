package ru.nsu.ccfit.citylibraries.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.ccfit.citylibraries.backend.entities.Publication;
import ru.nsu.ccfit.citylibraries.backend.services.PublicationService;

import java.util.List;

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
}
