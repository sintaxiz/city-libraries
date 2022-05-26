package ru.nsu.ccfit.citylibraries.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.citylibraries.backend.dto.LibraryPublicationInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Library;

import java.util.List;

@Repository
public interface LibraryRepository extends JpaRepository<Library, Integer> {
    @Query(nativeQuery = true, value =
            "SELECT * from get_literature_from_library(CAST(:library AS integer))")
    List<LibraryPublicationInfo> getLiteratureFromLibrary(Integer library);

}
