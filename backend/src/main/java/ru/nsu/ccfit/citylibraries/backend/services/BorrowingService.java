package ru.nsu.ccfit.citylibraries.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.citylibraries.backend.dto.ReaderBorrowingInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Borrowing;
import ru.nsu.ccfit.citylibraries.backend.repositories.BorrowingRepository;

import java.util.List;

@Service
public class BorrowingService {
    private final BorrowingRepository borrowingRepository;

    @Autowired
    public BorrowingService(BorrowingRepository borrowingRepository) {
        this.borrowingRepository = borrowingRepository;
    }

    public List<ReaderBorrowingInfo> getAll() {
        return borrowingRepository.findReaderBorrowingInfo();
    }

    public List<ReaderBorrowingInfo> getExpiredBorrowings() {
        return borrowingRepository.getExpiredBorrowings();
    }
}
