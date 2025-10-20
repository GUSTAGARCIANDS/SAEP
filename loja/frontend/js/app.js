// app.js - polished frontend interactions
const API = 'http://localhost:8080/api';
const toastEl = document.getElementById('toast');

function showToast(msg, time=2500){
  if(!toastEl) return;
  toastEl.textContent = msg;
  toastEl.style.display = 'block';
  setTimeout(()=> toastEl.style.display = 'none', time);
}

async function fetchProdutos(){
  try{
    const res = await fetch(API + '/produtos');
    if(!res.ok) throw new Error('Erro ao buscar produtos');
    return await res.json();
  }catch(e){
    console.error(e);
    return [];
  }
}

function formatMoney(v){ return Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

function getCarrinho(){ return JSON.parse(localStorage.getItem('carrinho')||'[]'); }
function salvarCarrinho(c){ localStorage.setItem('carrinho', JSON.stringify(c)); }

async function adicionarAoCarrinho(produto){
  const c = getCarrinho();
  const item = c.find(i=>i.produtoId===produto.id);
  if(item) item.quantidade++;
  else c.push({produtoId:produto.id, nome:produto.nome, preco:produto.preco, quantidade:1});
  salvarCarrinho(c);
  showToast('Adicionado ao carrinho');
}

async function renderDestaques(){
  const cont = document.getElementById('destaques');
  if(!cont) return;
  const produtos = await fetchProdutos();
  const cards = produtos.slice(0,6).map(p => buildCard(p)).join('');
  cont.innerHTML = cards;
  const hero = document.getElementById('heroProduto');
  if(hero && produtos[0]) hero.innerHTML = `<div style="font-weight:700">${produtos[0].nome} — ${formatMoney(produtos[0].preco)}</div><div style="color:var(--muted)">${produtos[0].descricao?produtos[0].descricao.substring(0,80):''}</div>`;
}

function buildCard(p){
  return `
  <article class="product-card">
    <div class="product-media">Imagem</div>
    <div class="product-body">
      <div class="product-title">${p.nome}</div>
      <div class="product-desc">${p.descricao?p.descricao.substring(0,120):''}</div>
    </div>
    <div class="product-footer">
      <div style="font-weight:700">${formatMoney(p.preco)}</div>
      <div><button class="btn" onclick='window.appAdd(${JSON.stringify(p)})'>Comprar</button></div>
    </div>
  </article>`;
}

window.appAdd = function(p){ adicionarAoCarrinho(p); };

async function renderProdutosList(){
  const cont = document.getElementById('produtosList');
  if(!cont) return;
  const produtos = await fetchProdutos();
  cont.innerHTML = produtos.map(p=>buildCard(p)).join('');
}

async function renderPerfil(){
  const user = JSON.parse(localStorage.getItem('usuario')||'null');
  const perfilInfo = document.getElementById('perfilInfo');
  if(!perfilInfo) return;
  if(!user){ perfilInfo.innerHTML = '<div>Você não está logado.</div>'; return;}
  perfilInfo.innerHTML = `<div><strong>${user.nome}</strong><div style="color:var(--muted)">${user.tipoUsuario}</div><div style="margin-top:8px">ID: ${user.usuarioId}</div></div>`;
  // fetch orders
  try{
    const res = await fetch(API + '/pedidos/usuario/' + user.usuarioId);
    if(res.ok){
      const pedidos = await res.json();
      const el = document.getElementById('meusPedidos');
      if(el){
        if(pedidos.length===0) el.innerHTML = '<div>Nenhum pedido</div>';
        else el.innerHTML = pedidos.map(pd=>`<div style="padding:10px;border-bottom:1px solid #f0f0f0">${pd.quantidade}x ${pd.produto.nome} — ${new Date(pd.dataCriacao).toLocaleString()}</div>`).join('');
      }
    }
  }catch(e){ console.error(e); }
}

// init
document.addEventListener('DOMContentLoaded', ()=>{ renderDestaques(); renderProdutosList(); renderPerfil(); });

// cart button
document.addEventListener('click',(e)=>{
  if(e.target && e.target.id==='cartBtn'){
    const c = getCarrinho();
    const list = c.length? c.map(i=>`${i.quantidade}x ${i.nome} — ${formatMoney(i.preco)}`).join('\n') : 'Carrinho vazio';
    alert(list);
  }
});
