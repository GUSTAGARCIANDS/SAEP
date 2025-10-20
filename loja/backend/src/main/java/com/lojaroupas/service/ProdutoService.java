package com.lojaroupas.service;

import com.lojaroupas.entity.Produto;
import com.lojaroupas.entity.TipoProduto;
import com.lojaroupas.repository.ProdutoRepository;
import com.lojaroupas.repository.TipoProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private TipoProdutoRepository tipoProdutoRepository;

    public Produto salvarProduto(Produto produto, String tipoNome) {
        Optional<TipoProduto> tipoOpt = tipoProdutoRepository.findByNome(tipoNome);
        tipoOpt.ifPresent(produto::setTipoProduto);
        return produtoRepository.save(produto);
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }
}
