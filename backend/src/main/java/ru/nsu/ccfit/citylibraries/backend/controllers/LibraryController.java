package ru.nsu.ccfit.citylibraries.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.ccfit.citylibraries.backend.dto.LibraryPublicationInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Library;
import ru.nsu.ccfit.citylibraries.backend.entities.Room;
import ru.nsu.ccfit.citylibraries.backend.services.LibraryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/libraries")
public class LibraryController {
    private final LibraryService libraryService;

    @Autowired
    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping
    public List<Library> getLibraries() {
        return libraryService.getLibraries();
    }
    @GetMapping(path = "/{id}")
    public Optional<Library> getLibrary(@PathVariable Integer id) {
        return libraryService.getLibrary(id);
    }

    @GetMapping(path="/rooms")
    public List<Room> getRooms() {
        return libraryService.getRooms();
    }

    @GetMapping(path="/{libraryId}/publications")
    public List<LibraryPublicationInfo> getLiteratureFromLibrary(@PathVariable Integer libraryId) {
        return libraryService.getLiteratureFromLibrary(libraryId);
    }
}
