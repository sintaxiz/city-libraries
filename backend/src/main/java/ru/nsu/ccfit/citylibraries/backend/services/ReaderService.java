package ru.nsu.ccfit.citylibraries.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.citylibraries.backend.dto.ReaderBorrowingInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Publication;
import ru.nsu.ccfit.citylibraries.backend.entities.Reader;
import ru.nsu.ccfit.citylibraries.backend.repositories.PublicationRepository;
import ru.nsu.ccfit.citylibraries.backend.repositories.ReaderRepository;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Service
public class ReaderService {
    private final ReaderRepository repository;

    @Autowired
    public ReaderService(ReaderRepository repository) {
        this.repository = repository;
    }

    public List<Reader> getReaders() {
        return repository.findAll();
    }

    public List<ReaderBorrowingInfo> getReadersWithLiterature(String literature, String borrowDate,
                                                              String returnDate) {
        return repository.getReadersWithLiterature(literature, borrowDate, returnDate);
    }
    public List<ReaderBorrowingInfo> getReadersWithLiterature(String literature) {
        return repository.getReadersWithLiterature(literature);
    }
}
