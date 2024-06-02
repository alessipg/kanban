package com.example.kanban.kanbancolumn;

import com.example.kanban.card.Card;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "columns")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class KanbanColumn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @OneToOne
    @JoinColumn(name = "first_card_id", referencedColumnName = "id")
    private Card firstCard;

    @OneToOne
    @JoinColumn(name = "next_column_id", referencedColumnName = "id")
    private KanbanColumn nextColumn;
    private LocalDate creationDate;
    private LocalDate modificationDate;

    public KanbanColumn(KanbanColumnRequestDTO data){
        this.title = data.title();
        this.creationDate = data.creationDate();
        this.modificationDate = data.modificationDate();
        this.firstCard = data.firstCard();
        this.nextColumn = data.nextColumn();
    }

}
