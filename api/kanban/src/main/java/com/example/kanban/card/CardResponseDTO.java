package com.example.kanban.card;

import java.time.LocalDate;

public record CardResponseDTO(Long id, String content, LocalDate creationDate, LocalDate modificationDate, Card nextCard) {
        public CardResponseDTO(Card card) {
            this(card.getId(), card.getContent(), card.getCreationDate(), card.getModificationDate(), card.getNextCard());
        }

}
