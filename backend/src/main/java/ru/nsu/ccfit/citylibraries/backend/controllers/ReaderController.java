package ru.nsu.ccfit.citylibraries.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.ccfit.citylibraries.backend.dto.ReaderBorrowingInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Reader;
import ru.nsu.ccfit.citylibraries.backend.services.ReaderService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/readers")
@Slf4j
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

    @GetMapping(path="/literature")
    public List<ReaderBorrowingInfo> getReadersWithLiterature
            (@RequestParam(required = true) String literature,
             @RequestParam(name = "borrowDate") Optional<String> borrowDate,
             @RequestParam(name = "returnDate") Optional<String> returnDate) {
        return borrowDate.isPresent() && returnDate.isPresent() ?
                service.getReadersWithLiterature(literature, borrowDate.get(), returnDate.get()) :
                service.getReadersWithLiterature(literature);
    }
}
