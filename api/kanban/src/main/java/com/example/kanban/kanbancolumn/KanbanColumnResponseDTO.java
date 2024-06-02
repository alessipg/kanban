package com.example.kanban.kanbancolumn;

import com.example.kanban.card.Card;

import java.time.LocalDate;

public record KanbanColumnResponseDTO(Long id, String title, LocalDate creationDate, LocalDate modificationDate, Card firstCard, KanbanColumn nextColumn) {
    public KanbanColumnResponseDTO(KanbanColumn kanbanColumn) {
        this(kanbanColumn.getId(), kanbanColumn.getTitle(), kanbanColumn.getCreationDate(), kanbanColumn.getModificationDate(), kanbanColumn.getFirstCard(), kanbanColumn.getNextColumn());
    }
}
