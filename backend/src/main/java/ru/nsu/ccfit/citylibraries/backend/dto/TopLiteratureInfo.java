package ru.nsu.ccfit.citylibraries.backend.dto;

import java.math.BigInteger;

public interface TopLiteratureInfo {
    Integer getId();

    String getTitle();

    String getAuthor();

    String getYear();

    BigInteger getReadersCount();
}
