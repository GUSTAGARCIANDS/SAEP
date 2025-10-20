package com.lojaroupas.controller;

import com.lojaroupas.dto.LoginRequest;
import com.lojaroupas.entity.Usuario;
import com.lojaroupas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        Usuario u = usuarioService.cadastrarUsuario(usuario, "PADRAO");
        return ResponseEntity.ok(u);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return usuarioService.autenticar(req.getEmail(), req.getSenha())
                .map(u -> {
                    Map<String,Object> resp = new HashMap<>();
                    resp.put("usuarioId", u.getId());
                    resp.put("nome", u.getNome());
                    resp.put("tipoUsuario", u.getTipoUsuario().getNome());
                    return ResponseEntity.ok(resp);
                })
                .orElse(ResponseEntity.status(401).body("Credenciais inválidas"));
    }
}
