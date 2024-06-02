package com.example.kanban.card;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "cards")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDate creationDate;
    private LocalDate modificationDate;

    @OneToOne
    @JoinColumn(name = "next_card_id", referencedColumnName = "id")
    private Card nextCard;

    public Card(CardRequestDTO data){
        this.content = data.content();
        this.nextCard = data.nextCard();
        this.creationDate = data.creationDate();
        this.modificationDate = data.modificationDate();
    }
}
