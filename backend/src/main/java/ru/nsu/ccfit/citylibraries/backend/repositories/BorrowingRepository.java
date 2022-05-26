package ru.nsu.ccfit.citylibraries.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.citylibraries.backend.dto.ReaderBorrowingInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Borrowing;

import java.util.List;

@Repository
public interface BorrowingRepository extends JpaRepository<Borrowing, Integer> {
    @Query(nativeQuery = true, value =
            "SELECT * from find_expired_borrowings()")
    List<ReaderBorrowingInfo> getExpiredBorrowings();

    @Query(nativeQuery = true, value =
            "SELECT * from get_reader_borrowing_info()")
    List<ReaderBorrowingInfo> findReaderBorrowingInfo();

}
