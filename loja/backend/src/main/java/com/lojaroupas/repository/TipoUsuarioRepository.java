package com.lojaroupas.repository;

import com.lojaroupas.entity.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TipoUsuarioRepository extends JpaRepository<TipoUsuario, Long> {
    Optional<TipoUsuario> findByNome(String nome);
}
