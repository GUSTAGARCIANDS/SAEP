// auth.js - register/login using the same API structure
const API = 'http://localhost:8080/api';

document.addEventListener('DOMContentLoaded', ()=>{
  const formLogin = document.getElementById('formLogin');
  if(formLogin){
    formLogin.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const fd = new FormData(formLogin);
      const body = { email: fd.get('email'), senha: fd.get('senha') };
      const res = await fetch(API + '/auth/login', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const msg = document.getElementById('loginMsg');
      if(res.ok){
        const data = await res.json();
        localStorage.setItem('usuario', JSON.stringify(data));
        msg.style.color='green'; msg.textContent='Logado com sucesso.';
        setTimeout(()=> location.href='index.html',800);
      } else { msg.style.color='crimson'; msg.textContent='Credenciais inválidas.'; }
    });
  }

  const formCadastro = document.getElementById('formCadastro');
  if(formCadastro){
    formCadastro.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const fd = new FormData(formCadastro);
      const body = { nome: fd.get('nome'), email: fd.get('email'), senha: fd.get('senha') };
      const res = await fetch(API + '/auth/register', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const msg = document.getElementById('msg');
      if(res.ok){ msg.style.color='green'; msg.textContent='Cadastro realizado. Faça login.'; formCadastro.reset(); }
      else{ msg.style.color='crimson'; msg.textContent='Erro no cadastro.'; }
    });
  }
});
