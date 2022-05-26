package ru.nsu.ccfit.citylibraries.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.nsu.ccfit.citylibraries.backend.dto.ReaderBorrowingInfo;
import ru.nsu.ccfit.citylibraries.backend.dto.WorkerJob;
import ru.nsu.ccfit.citylibraries.backend.services.WorkerService;

import java.util.List;

@RestController
@RequestMapping("api/v1/workers")
@Slf4j
public class WorkerController {
    private final WorkerService service;

    @Autowired
    public WorkerController(WorkerService service) {
        this.service = service;
    }

    @GetMapping(path = "/all")
    public List<WorkerJob> getAllWorkers() {
        return service.getAllWorkers();
    }

    @GetMapping(path="/{id}/readers")
    public List<ReaderBorrowingInfo> getReadersForWorker(@PathVariable Integer id) {
        return service.getReadersForWorker(id);
    }
}
