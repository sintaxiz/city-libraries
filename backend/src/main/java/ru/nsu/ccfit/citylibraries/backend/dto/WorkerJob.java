package ru.nsu.ccfit.citylibraries.backend.dto;

import java.math.BigInteger;

public interface WorkerJob {
    Integer getWorkerId();

    String getWorkerName();

    Integer getRoomId();

    String getLibraryName();

    BigInteger getReadersCount();
}
