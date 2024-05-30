package com.example.kanban.coluna;

import java.time.LocalDate;

public record ColunaRequestDTO(String title, LocalDate creationDate, LocalDate modificationDate) {
}
