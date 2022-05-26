package ru.nsu.ccfit.citylibraries.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.citylibraries.backend.dto.ReaderBorrowingInfo;
import ru.nsu.ccfit.citylibraries.backend.dto.WorkerJob;
import ru.nsu.ccfit.citylibraries.backend.entities.Worker;

import java.util.List;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Integer> {
    @Query(nativeQuery = true, value =
            "SELECT * from get_workers()")
    List<WorkerJob> getAllWorkers();

    @Query(nativeQuery = true, value =
            "SELECT * from find_worker_readers(CAST(:workerId AS integer))")
    List<ReaderBorrowingInfo> getReadersForWorker(Integer workerId);
}
