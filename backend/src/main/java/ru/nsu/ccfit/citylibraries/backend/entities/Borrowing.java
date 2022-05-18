package ru.nsu.ccfit.citylibraries.backend.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "borrowing")
public class Borrowing {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name="reader_id")
    private Integer readerId;

    @Column(name="publication_id")
    private Integer publicationId;

    @Column(name="worker_id")
    private Integer workerId;

    @Column(name="library_id")
    private Integer libraryId;

    @Column(name="take_date")
    private LocalDate takeDate;

    @Column(name="return_date")
    private LocalDate returnDate;

    @Column(name="return_term")
    private Integer returnTerm;
}
