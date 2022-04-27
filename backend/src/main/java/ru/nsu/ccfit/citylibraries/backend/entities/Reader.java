package ru.nsu.ccfit.citylibraries.backend.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "reader")
public class Reader {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "name")
    private String name;
}
