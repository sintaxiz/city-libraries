package ru.nsu.ccfit.citylibraries.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.citylibraries.backend.dto.ReaderBorrowingInfo;
import ru.nsu.ccfit.citylibraries.backend.dto.WorkerJob;
import ru.nsu.ccfit.citylibraries.backend.repositories.WorkerRepository;

import java.util.List;

@Service
public class WorkerService {
    private final WorkerRepository workerRepository;

    @Autowired
    public WorkerService(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    public List<WorkerJob> getAllWorkers() {
        return workerRepository.getAllWorkers();
    }

    public List<ReaderBorrowingInfo> getReadersForWorker(Integer workerId) {
        return workerRepository.getReadersForWorker(workerId);
    }
}
