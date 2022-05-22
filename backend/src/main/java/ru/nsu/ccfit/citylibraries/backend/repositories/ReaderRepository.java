package ru.nsu.ccfit.citylibraries.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.citylibraries.backend.dto.ReaderBorrowingInfo;
import ru.nsu.ccfit.citylibraries.backend.entities.Reader;

import java.util.List;
import java.util.Map;

@Repository
public interface ReaderRepository extends JpaRepository<Reader, Integer> {
    // 2. Выдать перечень читателей, на руках у которых находится указанное произведение.

    @Query(nativeQuery = true, value =
            "SELECT * from find_readers_with_literature(CAST(:literature AS VARCHAR))")
    List<ReaderBorrowingInfo> getReadersWithLiterature(String literature);


    @Query(nativeQuery = true, value =
            "SELECT * from find_readers_with_literature(" +
                    "CAST(:literature AS VARCHAR)," +
                    "CAST(:borrow_date AS TIMESTAMP)," +
                    "CAST(:return_date AS TIMESTAMP))")
    List<ReaderBorrowingInfo> getReadersWithLiterature(@Param("literature") String literature,
                                                       @Param("borrow_date") String borrowDate,
                                                       @Param("return_date") String returnDate);

    @Query(nativeQuery = true, value =
            "SELECT readerId from find_students("
                    + "CAST(:university AS VARCHAR))")
    List<Integer> getStudents(@Param("university") String university);

    @Query(nativeQuery = true, value =
            "SELECT readerId from find_schoolboys(" +
                    "CAST(:school AS VARCHAR)," +
                    "CAST(:grade AS VARCHAR ))")
    List<Integer> getSchoolboys(@Param("school") String university,
                                @Param("grade") String grade);

    @Query(nativeQuery = true, value =
            "SELECT university FROM student s WHERE s.reader_id = CAST(:readerId AS int)")
    Map<String, Object> getStudentParams(Integer readerId);

    @Query(nativeQuery = true, value =
            "SELECT grade, school FROM schoolboy s WHERE s.reader_id = CAST(:readerId AS int)")
    Map<String, Object> getSchoolboyParams(@Param("readerId") Integer readerId);
}
