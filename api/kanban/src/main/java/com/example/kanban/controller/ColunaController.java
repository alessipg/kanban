package com.example.kanban.controller;
import com.example.kanban.coluna.Column;
import com.example.kanban.coluna.ColunaRepository;
import com.example.kanban.coluna.ColunaResponseDTO;
import com.example.kanban.coluna.ColunaRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("coluna")
@CrossOrigin("*")
public class ColunaController {

    @Autowired
    private final ColunaRepository colunaRepository;

    public ColunaController(ColunaRepository colunaRepository) {
        this.colunaRepository = colunaRepository;
    }

    @GetMapping
    public List<ColunaResponseDTO> getAll(){
        List<ColunaResponseDTO> colunas = colunaRepository.findAll().stream().map(ColunaResponseDTO::new).toList();
        return colunas;
    }
    @PostMapping
    public void SaveColuna(@RequestBody ColunaRequestDTO data){
        Column columnData = new Column(data);
        colunaRepository.save(columnData);
    }
}
