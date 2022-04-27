package ru.nsu.ccfit.citylibraries.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.citylibraries.backend.entities.Literature;

@Repository
public interface LiteratureRepository extends JpaRepository<Literature, Integer> {
}
