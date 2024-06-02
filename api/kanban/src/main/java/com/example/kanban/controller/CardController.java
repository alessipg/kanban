package com.example.kanban.controller;

import com.example.kanban.card.Card;
import com.example.kanban.card.CardRepository;
import com.example.kanban.card.CardRequestDTO;
import com.example.kanban.card.CardResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("card")
@CrossOrigin("*")
public class CardController {

    @Autowired
    private final CardRepository cardRepository;

    public CardController(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    @GetMapping
    public List<CardResponseDTO> getAll(){
        List<CardResponseDTO> cards = cardRepository.findAll().stream().map(CardResponseDTO::new).toList();
        return cards;
    }
    @PostMapping
    public void SaveCard(@RequestBody CardRequestDTO data){
        Card cardData = new Card(data);
        cardRepository.save(cardData);
    }
}
