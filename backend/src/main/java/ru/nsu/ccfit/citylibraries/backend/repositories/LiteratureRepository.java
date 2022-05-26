package ru.nsu.ccfit.citylibraries.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.citylibraries.backend.dto.TopLiteratureInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Literature;
import ru.nsu.ccfit.citylibraries.backend.entities.Publication;

import java.util.List;

@Repository
public interface LiteratureRepository extends JpaRepository<Literature, Integer> {
    @Query(nativeQuery = true,
            value = "SELECT * FROM get_top()")
    List<TopLiteratureInfo> getTop();

    @Query(nativeQuery = true,
            value = "select p.id " +
                    "from literature l " +
                    "inner join publication_literature pl on l.id = pl.literature_id and l.id = :id " +
                    "inner join publication p on pl.publication_id = p.id;")
    List<Integer> getPublications(Integer id);
}
