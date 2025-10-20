// product-admin.js - only admins can create products (front-end check)
const API = 'http://localhost:8080/api';

document.addEventListener('DOMContentLoaded', ()=>{
  const f = document.getElementById('formProduto');
  if(!f) return;
  f.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('usuario')||'null');
    const msg = document.getElementById('msgProduto');
    if(!user || user.tipoUsuario !== 'ADMIN'){ msg.style.color='crimson'; msg.textContent='Ação permitida apenas para ADMIN.'; return; }
    const fd = new FormData(f);
    const produto = { nome: fd.get('nome'), descricao: fd.get('descricao'), preco: Number(fd.get('preco')) };
    const tipo = fd.get('tipo');
    const res = await fetch(API + '/produtos?tipo=' + encodeURIComponent(tipo), {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(produto)});
    if(res.ok){ msg.style.color='green'; msg.textContent='Produto criado.'; f.reset(); }
    else{ msg.style.color='crimson'; msg.textContent='Erro ao criar produto.'; }
  });
});
