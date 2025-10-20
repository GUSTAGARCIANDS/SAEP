package com.lojaroupas.service;

import com.lojaroupas.entity.TipoUsuario;
import com.lojaroupas.entity.Usuario;
import com.lojaroupas.repository.TipoUsuarioRepository;
import com.lojaroupas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TipoUsuarioRepository tipoUsuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario cadastrarUsuario(Usuario usuario, String tipoNome) {
        Optional<TipoUsuario> tipoOpt = tipoUsuarioRepository.findByNome(tipoNome);
        tipoOpt.ifPresent(usuario::setTipoUsuario);
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> autenticar(String email, String senha) {
        Optional<Usuario> opt = usuarioRepository.findByEmail(email);
        if (opt.isPresent()) {
            Usuario u = opt.get();
            if (passwordEncoder.matches(senha, u.getSenha())) {
                return Optional.of(u);
            }
        }
        return Optional.empty();
    }
}
