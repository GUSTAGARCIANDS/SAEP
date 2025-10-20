package com.lojaroupas.repository;

import com.lojaroupas.entity.TipoProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TipoProdutoRepository extends JpaRepository<TipoProduto, Long> {
    Optional<TipoProduto> findByNome(String nome);
}
