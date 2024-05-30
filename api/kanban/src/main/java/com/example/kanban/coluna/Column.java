package com.example.kanban.coluna;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Table(name = "columns")
@Entity(name = "coluna")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Column {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private LocalDate creationDate;
    private LocalDate modificationDate;

    public Column(ColunaRequestDTO data){
        this.title = data.title();
        this.creationDate = data.creationDate();
        this.modificationDate = data.modificationDate();
    }
}
