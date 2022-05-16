package ru.nsu.ccfit.citylibraries.backend.dto;

import java.time.LocalDate;

public interface ReaderBorrowingInfo {
    String getReaderName();
    String getPublicationName();
    String getLibrary();
    LocalDate getBorrowingDate();
}
