package com.example.kanban.kanbancolumn;

import com.example.kanban.card.Card;

import java.time.LocalDate;

public record KanbanColumnRequestDTO(String title, LocalDate creationDate, LocalDate modificationDate, Card firstCard, KanbanColumn nextColumn) {
}
