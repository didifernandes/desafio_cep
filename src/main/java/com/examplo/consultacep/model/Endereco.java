package com.examplo.consultacep.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class Endereco {

    @Id
    private String cep;

    private String logradouro;

    private String bairro;

    @JsonProperty("localidade")
    @Column(name = "cidade")
    private String localidade;

    @Column(name = "estado")
    private String uf;


    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return localidade;
    }

    public void setCidade(String localidade) {
        this.localidade = localidade;
    }

    public String getEstado() {
        return uf;
    }

    public void setEstado(String uf) {
        this.uf = uf;
    }
}
