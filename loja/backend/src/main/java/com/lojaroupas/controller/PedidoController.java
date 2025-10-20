package com.lojaroupas.controller;

import com.lojaroupas.entity.Pedido;
import com.lojaroupas.repository.PedidoRepository;
import com.lojaroupas.repository.ProdutoRepository;
import com.lojaroupas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping
    public ResponseEntity<?> criarPedido(@RequestBody Pedido pedido) {
        Optional.ofNullable(pedido.getUsuario()).flatMap(u -> usuarioRepository.findById(u.getId()))
                .orElseThrow(() -> new RuntimeException("Usuário inválido"));
        Optional.ofNullable(pedido.getProduto()).flatMap(p -> produtoRepository.findById(p.getId()))
                .orElseThrow(() -> new RuntimeException("Produto inválido"));
        Pedido salvo = pedidoRepository.save(pedido);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Pedido>> pedidosDoUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(pedidoRepository.findByUsuarioId(usuarioId));
    }
}
