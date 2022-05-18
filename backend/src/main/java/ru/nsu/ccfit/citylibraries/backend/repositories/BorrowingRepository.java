package ru.nsu.ccfit.citylibraries.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.citylibraries.backend.entities.Borrowing;

@Repository
public interface BorrowingRepository extends JpaRepository<Borrowing, Integer> {
}
