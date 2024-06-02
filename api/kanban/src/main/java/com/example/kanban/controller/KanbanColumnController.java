package com.example.kanban.controller;

import com.example.kanban.kanbancolumn.KanbanColumn;
import com.example.kanban.kanbancolumn.KanbanColumnRepository;
import com.example.kanban.kanbancolumn.KanbanColumnRequestDTO;
import com.example.kanban.kanbancolumn.KanbanColumnResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("column")
@CrossOrigin("*")
public class KanbanColumnController {

    @Autowired
    private final KanbanColumnRepository kanbanColumnRepository;

    public KanbanColumnController(KanbanColumnRepository kanbanColumnRepository) {
        this.kanbanColumnRepository = kanbanColumnRepository;
    }

    @GetMapping
    public List<KanbanColumnResponseDTO> getAll(){
        List<KanbanColumnResponseDTO> columns = kanbanColumnRepository.findAll().stream().map(KanbanColumnResponseDTO::new).toList();
        return columns;
    }
    @PostMapping
    public void SaveColumn(@RequestBody KanbanColumnRequestDTO data){
        KanbanColumn kanbanColumnData = new KanbanColumn(data);
        kanbanColumnRepository.save(kanbanColumnData);
    }
}
