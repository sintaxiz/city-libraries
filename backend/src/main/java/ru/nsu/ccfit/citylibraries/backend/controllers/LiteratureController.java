package ru.nsu.ccfit.citylibraries.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.ccfit.citylibraries.backend.entities.Literature;
import ru.nsu.ccfit.citylibraries.backend.services.LiteratureService;

import java.util.List;

@RestController
@RequestMapping("api/v1/literature")
public class LiteratureController {
    private final LiteratureService service;

    @Autowired
    public LiteratureController(LiteratureService service) {
        this.service = service;
    }

    @GetMapping
    public List<Literature> getLiterature() {
        return service.getLiterature();
    }
}
