package ru.nsu.ccfit.citylibraries.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.citylibraries.backend.dto.ReaderBorrowingInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Reader;
import ru.nsu.ccfit.citylibraries.backend.entities.ReaderCategory;
import ru.nsu.ccfit.citylibraries.backend.services.ReaderService;

import java.util.List;
import java.util.Map;
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

    @GetMapping(path = "/all")
    public List<Reader> getAllReaders() {
        return service.getAllReaders();
    }

    @GetMapping(path = "/{readerId}")
    public Optional<Reader> getReader(@PathVariable Integer readerId) {
        return service.getReader(readerId);
    }

    @GetMapping(path = "/{categoryId}/{readerId}")
    public Map<String, Object> getReaderParams(@PathVariable Integer readerId, @PathVariable Integer categoryId) {
        return service.getReaderParams(readerId, categoryId);
    }

    @GetMapping
    public List<Reader> getReadersWithParams(@RequestParam(name = "categoryId") Integer categoryId,
                                   @RequestParam Map<String, String> params) {
        return service.getReadersWithParams(categoryId, params);
    }

    @GetMapping(path = "/literature")
    public List<ReaderBorrowingInfo> getReadersWithLiterature
            (@RequestParam(required = true) String literature,
             @RequestParam(name = "borrowDate") Optional<String> borrowDate,
             @RequestParam(name = "returnDate") Optional<String> returnDate) {
        return borrowDate.isPresent() && returnDate.isPresent() ?
                service.getReadersWithLiterature(literature, borrowDate.get(), returnDate.get()) :
                service.getReadersWithLiterature(literature);
    }

    @GetMapping(path = "/categories")
    public List<ReaderCategory> getCategories() {
        return service.getCategories();
    }

    @GetMapping(path="/not-attend")
    public List<Reader> getReadersWhoNotAttend
            (@RequestParam(name = "startDate") Optional<String> startDate,
             @RequestParam(name = "finishDate") Optional<String> finishDate) {
        return startDate.isPresent() && finishDate.isPresent() ?
                service.getReadersWhoNotAttend(startDate.get(), finishDate.get()) :
                service.getReadersWhoNotAttend();
    }
}
