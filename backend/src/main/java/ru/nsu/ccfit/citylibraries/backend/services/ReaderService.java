package ru.nsu.ccfit.citylibraries.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.citylibraries.backend.dto.ReaderBorrowingInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Reader;
import ru.nsu.ccfit.citylibraries.backend.entities.ReaderCategory;
import ru.nsu.ccfit.citylibraries.backend.repositories.CategoryRepository;
import ru.nsu.ccfit.citylibraries.backend.repositories.ReaderRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReaderService {
    private final ReaderRepository readerRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ReaderService(ReaderRepository repository, CategoryRepository categoryRepository) {
        this.readerRepository = repository;
        this.categoryRepository = categoryRepository;
    }

    public List<Reader> getReadersWithParams(Integer categoryId, Map<String, String> params) {
        if (categoryId != 1 && categoryId != 2) {
            List<Reader> readersWithoutCategory = new ArrayList<>();
            for (Reader r : readerRepository.findAll()) {
                if (r.getCategoryId() == null) {
                    readersWithoutCategory.add(r);
                }
            }
            return readersWithoutCategory;
        }
        List<Integer> readerIds = new ArrayList<>();
        if (categoryId == 1) {
            readerIds = readerRepository.getSchoolboys(params.get("school"), params.get("school"));
        }
        if (categoryId == 2) {
            readerIds = readerRepository.getStudents(params.get("university"));
        }
        return readerRepository.findAllById(readerIds);
    }

    public List<ReaderBorrowingInfo> getReadersWithLiterature(String literature, String borrowDate,
                                                              String returnDate) {
        return readerRepository.getReadersWithLiterature(literature, borrowDate, returnDate);
    }

    public List<ReaderBorrowingInfo> getReadersWithLiterature(String literature) {
        return readerRepository.getReadersWithLiterature(literature);
    }

    public List<ReaderCategory> getCategories() {
        return categoryRepository.findAll();
    }

    public Map<String, Object> getReaderParams(Integer readerId, Integer categoryId) {
        return switch (categoryId) {
            case 1 -> readerRepository.getSchoolboyParams(readerId);
            case 2 -> readerRepository.getStudentParams(readerId);
            default -> new HashMap<>();
        };
    }

    public List<Reader> getAllReaders() {
        return readerRepository.findAll();
    }
}
