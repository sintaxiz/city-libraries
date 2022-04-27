package ru.nsu.ccfit.citylibraries.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.ccfit.citylibraries.backend.entities.Reader;
import ru.nsu.ccfit.citylibraries.backend.services.ReaderService;

import java.util.List;

@RestController
@RequestMapping("api/v1/readers")
public class ReaderController {
    private final ReaderService service;

    @Autowired
    public ReaderController(ReaderService service) {
        this.service = service;
    }

    @GetMapping
    public List<Reader> getReaders() {
        return service.getReaders();
    }
}
