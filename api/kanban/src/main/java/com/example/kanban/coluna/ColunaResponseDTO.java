package com.example.kanban.coluna;

import java.time.LocalDate;

public record ColunaResponseDTO(Long id, String title, LocalDate creationDate, LocalDate modificationDate) {
    public ColunaResponseDTO(Column column) {
        this(column.getId(), column.getTitle(), column.getCreationDate(), column.getModificationDate());
    }
}
