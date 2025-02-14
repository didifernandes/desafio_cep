package com.examplo.consultacep.controller;

import com.examplo.consultacep.model.Endereco;
import com.examplo.consultacep.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CepController {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @GetMapping("/consultar-cep/{cep}")
    public Endereco consultarCep(@PathVariable String cep) {
        String url = "https://viacep.com.br/ws/" + cep + "/json/";
        RestTemplate restTemplate = new RestTemplate();
        Endereco endereco = restTemplate.getForObject(url, Endereco.class);

        if (endereco != null && endereco.getCep() != null) {
            enderecoRepository.save(endereco);
        }
        return endereco;
    }

    @GetMapping("/enderecos")
    public List<Endereco> listarEnderecos(@RequestParam String campo, @RequestParam boolean crescente) {
        Sort sort = crescente ? Sort.by(campo).ascending() : Sort.by(campo).descending();
        return enderecoRepository.findAll(sort);
    }
}

