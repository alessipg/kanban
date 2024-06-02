package com.example.kanban.card;

import java.time.LocalDate;

public record CardRequestDTO(String content, LocalDate creationDate, LocalDate modificationDate, Card nextCard) {
}
