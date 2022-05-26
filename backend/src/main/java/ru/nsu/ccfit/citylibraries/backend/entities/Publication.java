package ru.nsu.ccfit.citylibraries.backend.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "publication")
public class Publication {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "bookshelf_id")
    private Integer bookshelfId;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "receipt_date")
    private LocalDate receiptDate;

    @Column(name = "throw_date")
    private LocalDate throwDate;

}
