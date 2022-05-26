package ru.nsu.ccfit.citylibraries.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.citylibraries.backend.dto.LibraryPublicationInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Library;
import ru.nsu.ccfit.citylibraries.backend.entities.Room;
import ru.nsu.ccfit.citylibraries.backend.repositories.LibraryRepository;
import ru.nsu.ccfit.citylibraries.backend.repositories.RoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {
    private final LibraryRepository libraryRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public LibraryService(LibraryRepository libraryRepository, RoomRepository roomRepository) {
        this.libraryRepository = libraryRepository;
        this.roomRepository = roomRepository;
    }

    public List<Library> getLibraries() {
        return libraryRepository.findAll();
    }

    public Optional<Library> getLibrary(Integer id) {
        return libraryRepository.findById(id);
    }

    public List<Room> getRooms() {
        return roomRepository.findAll();
    }

    public List<LibraryPublicationInfo> getLiteratureFromLibrary(Integer library) {
        return libraryRepository.getLiteratureFromLibrary(library);
    }
}
