package ru.nsu.ccfit.citylibraries.backend.dto;

import java.time.LocalDate;

public interface LibraryPublicationInfo {
    Integer getRoomId();
    Integer getBookshelfId();
    String getPublicationName();
    String getAuthor();
    String getYear();
    String getReader();
    LocalDate getBorrowingDate();
    LocalDate getReturnDate();
}
