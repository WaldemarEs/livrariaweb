(function () {

  const css = `
    #lus-container {
      position: fixed; bottom: 96px; right: 12px; z-index: 9999;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }
    @media (min-width: 768px) { #lus-container { bottom: 28px; right: 28px; } }

    #lus-greeting {
      position: absolute; bottom: 66px; right: 0;
      background: #FFFFFF;
      border: 1.5px solid #5C9E31;
      color: #1A1A1A;
      padding: 9px 16px; border-radius: 24px;
      box-shadow: 0 10px 25px -5px rgba(92, 158, 49, 0.3), 0 4px 12px rgba(26, 26, 26, 0.06);
      font-size: 12px; font-weight: 600; white-space: nowrap;
      cursor: pointer; display: flex; align-items: center; gap: 8px;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    @media (min-width: 768px) { #lus-greeting { bottom: 74px; } }
    #lus-greeting::after {
      content:''; position:absolute; bottom:-6px; right:20px;
      width:9px; height:9px; background:#FFFFFF;
      border-right:1.5px solid #5C9E31; border-bottom:1.5px solid #5C9E31;
      transform:rotate(45deg);
    }
    #lus-greeting.hidden { opacity:0; pointer-events:none; transform:translateY(6px); }

    .lus-greeting-dots {
      display: inline-flex; align-items: center; gap: 4px; padding: 2px 4px;
    }
    .lus-greeting-dots span {
      width: 5px; height: 5px; border-radius: 50%; background: #5C9E31;
      display: inline-block; opacity: 0.4;
      animation: lus-dot-bounce 1.2s ease-in-out infinite;
    }
    .lus-greeting-dots span:nth-child(2) { animation-delay: 0.2s; }
    .lus-greeting-dots span:nth-child(3) { animation-delay: 0.4s; }

    #lus-toggle {
      width:46px; height:46px; border-radius:50%; background:#5C9E31;
      border:2.5px solid #FAFBF6; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      position:relative; box-shadow:0 6px 20px rgba(92,158,49,0.38);
      transition:transform 0.2s ease, box-shadow 0.2s ease;
    }
    @media (min-width:768px) { #lus-toggle { width:52px; height:52px; } }
    #lus-toggle:hover { transform:translateY(-3px); box-shadow:0 10px 26px rgba(92,158,49,0.45); }
    .lus-eye { transform-origin:center; animation:lus-blink 5s infinite; }
    @keyframes lus-blink { 0%,87%,100%{transform:scaleY(1)} 90%,93%{transform:scaleY(0.08)} }
    #lus-toggle svg { animation:lus-float 3.5s ease-in-out infinite; }
    @keyframes lus-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
    #lus-dot {
      position:absolute; top:-2px; right:-2px; width:11px; height:11px;
      background:#E88923; border-radius:50%; border:2px solid #FAFBF6;
    }
    #lus-dot.hidden { display:none; }

    #lus-window {
      position:absolute; bottom:60px; right:0; width:296px;
      max-width:calc(100vw - 24px);
      background:rgba(255,255,255,0.92); backdrop-filter:blur(18px);
      -webkit-backdrop-filter:blur(18px);
      border:1px solid rgba(255,255,255,0.95); border-radius:16px;
      box-shadow:0 12px 40px rgba(26,26,26,0.10), 0 0 0 1px rgba(228,232,215,0.6);
      display:flex; flex-direction:column; overflow:hidden;
      transition:opacity 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1);
    }
    @media (min-width:768px) { #lus-window { width:306px; bottom:66px; } }
    #lus-window.hidden { opacity:0; pointer-events:none; transform:translateY(12px) scale(0.97); }

    #lus-header {
      background: linear-gradient(90deg, rgba(250,251,246,0.97) 0%, rgba(240,248,232,0.97) 50%, rgba(250,251,246,0.97) 100%);
      background-size: 200% 100%;
      animation: lus-shimmer 4s ease-in-out infinite;
      border-bottom:1px solid #E4E8D7;
      padding:11px 13px; display:flex; align-items:center; gap:9px;
    }
    @keyframes lus-shimmer {
      0%,100% { background-position: 0% 0%; }
      50%      { background-position: 100% 0%; }
    }
    #lus-avatar-wrap {
      width:34px; height:34px; border-radius:50%; background:#5C9E31;
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      box-shadow:0 2px 8px rgba(92,158,49,0.3);
    }
    #lus-info { flex:1; }
    #lus-name { font-size:13px; font-weight:700; color:#1A1A1A; }

    /* Typing indicator */
    .lus-typing {
      display:flex; align-items:center; gap:3px;
      padding:8px 12px; align-self:flex-start;
    }
    .lus-typing span {
      width:6px; height:6px; border-radius:50%; background:#5C9E31;
      display:inline-block; opacity:0.4;
      animation: lus-dot-bounce 1.2s ease-in-out infinite;
    }
    .lus-typing span:nth-child(2) { animation-delay: 0.2s; }
    .lus-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes lus-dot-bounce {
      0%,80%,100% { transform:translateY(0); opacity:0.4; }
      40%          { transform:translateY(-5px); opacity:1; }
    }
    #lus-status {
      font-size:10px; color:#66695C;
      display:flex; align-items:center; gap:4px; margin-top:1px;
    }
    #lus-status::before {
      content:''; display:inline-block; width:6px; height:6px;
      border-radius:50%; background:#5C9E31;
    }
    #lus-close {
      background:none; border:none; cursor:pointer;
      color:#949887; font-size:20px; line-height:1; padding:2px;
      transition:color 0.15s;
    }
    #lus-close:hover { color:#1A1A1A; }

    #lus-messages {
      flex:1; overflow-y:auto; padding:12px 11px;
      display:flex; flex-direction:column; gap:8px;
      background:#FAFBF6; min-height:80px; max-height:230px;
      scrollbar-width:thin; scrollbar-color:rgba(92,158,49,0.4) transparent;
    }
    #lus-messages::-webkit-scrollbar { width:5px; }
    #lus-messages::-webkit-scrollbar-track { background:transparent; }
    #lus-messages::-webkit-scrollbar-thumb { background:rgba(92,158,49,0.4); border-radius:9999px; }
    #lus-messages::-webkit-scrollbar-thumb:hover { background:#5C9E31; }

    .lus-msg {
      font-size:12.5px; line-height:1.55; padding:8px 11px;
      border-radius:11px; max-width:92%; word-wrap:break-word;
      animation:lus-pop 0.2s ease;
    }
    @keyframes lus-pop { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
    .lus-msg.bot {
      background:rgba(255,255,255,0.9); border:1px solid #E4E8D7;
      color:#3D4035; align-self:flex-start; border-bottom-left-radius:3px;
    }
    .lus-msg.user {
      background:#E6F2DE; color:#3D4035; font-weight:600;
      align-self:flex-end; border:1px solid #c8e0b5; border-bottom-right-radius:3px;
    }
    .lus-msg strong { color:#1A1A1A; font-weight:700; }
    .lus-msg a { color:#5C9E31; font-weight:600; text-decoration:underline; }

    #lus-actions {
      padding:9px 11px 11px; border-top:1px solid #E4E8D7;
      background:rgba(255,255,255,0.94);
      display:flex; flex-direction:column; gap:5px;
      max-height:200px; overflow-y:auto;
      scrollbar-width:thin; scrollbar-color:rgba(92,158,49,0.3) transparent;
    }
    #lus-actions::-webkit-scrollbar { width:4px; }
    #lus-actions::-webkit-scrollbar-thumb { background:rgba(92,158,49,0.3); border-radius:9999px; }

    .lus-btn {
      padding:8px 11px; border-radius:8px; border:1.5px solid #E4E8D7;
      background:rgba(250,251,246,0.8); color:#3D4035;
      font-size:12px; font-weight:500;
      font-family:'Plus Jakarta Sans', system-ui, sans-serif;
      cursor:pointer; text-align:left; display:block; text-decoration:none;
      transition:border-color 0.15s, background 0.15s, color 0.15s;
    }
    .lus-btn:hover { border-color:#5C9E31; color:#477A25; background:#E6F2DE; }
    .lus-btn.primary { background:#5C9E31; color:#fff; border-color:#5C9E31; font-weight:600; }
    .lus-btn.primary:hover { background:#477A25; border-color:#477A25; }
    .lus-btn.ghost { background:transparent; border-color:transparent; color:#949887; font-size:11.5px; padding:4px 8px; }
    .lus-btn.ghost:hover { color:#3D4035; }

    .lus-input-row { display:flex; gap:6px; align-items:center; }
    .lus-input {
      flex:1; padding:8px 10px; border:1.5px solid #E4E8D7; border-radius:8px;
      font-size:12.5px; color:#1A1A1A;
      font-family:'Plus Jakarta Sans', system-ui, sans-serif;
      background:rgba(250,251,246,0.8); outline:none;
      transition:border-color 0.15s, background 0.15s;
    }
    .lus-input:focus { border-color:#5C9E31; background:#fff; }
    .lus-send {
      width:34px; height:34px; flex-shrink:0; border-radius:8px;
      background:#5C9E31; color:#fff; border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      transition:background 0.15s;
    }
    .lus-send:hover { background:#477A25; }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const mkSVG = (sz, eyeFill) =>
    `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
    `<rect x="3" y="10" width="18" height="11" rx="3" fill="#ffffff" stroke="none"/>` +
    `<path d="M12 1v4" stroke="#ffffff" stroke-width="1.8"/>` +
    `<circle cx="12" cy="1.5" r="1" fill="#ffffff"/>` +
    `<circle class="lus-eye" cx="8.5" cy="15" r="1.7" fill="${eyeFill}"/>` +
    `<circle class="lus-eye" cx="15.5" cy="15" r="1.7" fill="${eyeFill}"/>` +
    `<path d="M9 18.5c1.5 1.3 4.5 1.3 6 0" stroke="${eyeFill}" stroke-width="1.6"/></svg>`;

  const wrap = document.createElement('div');
  wrap.id = 'lus-container';
  wrap.innerHTML =
    '<div id="lus-greeting" class="hidden"><span>Precisa de ajuda? &#x1F44B;</span></div>' +
    '<button id="lus-toggle" title="Falar com a Lusitana">' +
    '<div id="lus-dot" class="hidden"></div>' + mkSVG(26,'#5C9E31') + '</button>' +
    '<div id="lus-window" class="hidden">' +
    '<div id="lus-header">' +
    '<div id="lus-avatar-wrap">' + mkSVG(22,'#FAFBF6') + '</div>' +
    '<div id="lus-info"><div id="lus-name">Lusitana</div><div id="lus-status">Dispon\u00edvel agora</div></div>' +
    '<button id="lus-close">&times;</button></div>' +
    '<div id="lus-messages"></div><div id="lus-actions"></div></div>';
  document.body.appendChild(wrap);

  var win      = document.getElementById('lus-window');
  var greeting = document.getElementById('lus-greeting');
  var msgs     = document.getElementById('lus-messages');
  var actions  = document.getElementById('lus-actions');
  var dot      = document.getElementById('lus-dot');
  var ctx      = {};

  // ── SEGURANÇA E VALIDAÇÃO ──────────────────────────────────────────────
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function isValidPhone(phone) {
    var digits = phone.replace(/\D/g, '');
    var phoneRe = /^(\+?[0-9]{1,4}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{7,15}$/;
    return digits.length >= 7 && digits.length <= 15 && phoneRe.test(phone);
  }

  // Helpers
  function showTyping() {
    var t = document.createElement('div');
    t.className = 'lus-typing'; t.id = 'lus-typing-ind';
    t.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
    return t;
  }
  function addMsg(html, sender) {
    if (sender && sender === 'user') {
      var d = document.createElement('div');
      d.className = 'lus-msg user';
      d.innerHTML = escapeHTML(html);
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return;
    }
    // Bot: show typing indicator then message
    var typing = showTyping();
    setTimeout(function() {
      var old = document.getElementById('lus-typing-ind');
      if (old) old.remove();
      var d = document.createElement('div');
      d.className = 'lus-msg bot';
      d.innerHTML = html;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
    }, 500);
  }
  function clr() { actions.innerHTML = ''; }
  function btn(label, cls, fn) {
    var b = document.createElement('button');
    b.className = 'lus-btn '+(cls||'');
    b.innerHTML = label;
    b.addEventListener('click', fn);
    actions.appendChild(b);
    return b;
  }
  function link(label, href, cls) {
    var a = document.createElement('a');
    a.className = 'lus-btn '+(cls||'primary');
    a.innerHTML = label; a.href = href;
    actions.appendChild(a);
  }
  function askInput(placeholder, fn) {
    clr(); // limpa sempre antes de mostrar novo campo
    var row = document.createElement('div');
    row.className = 'lus-input-row';
    var inp = document.createElement('input');
    inp.type = 'text'; inp.placeholder = placeholder; inp.className = 'lus-input';
    var sv = document.createElement('button');
    sv.className = 'lus-send';
    sv.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    function go() {
      var v = inp.value.trim();
      if (!v) { inp.focus(); return; }
      inp.disabled = true; sv.disabled = true; // evita duplo envio
      addMsg(v, 'user'); fn(v);
    }
    sv.onclick = go;
    inp.onkeydown = function(e) { if (e.key === 'Enter') go(); };
    row.appendChild(inp); row.appendChild(sv);
    actions.appendChild(row);
    setTimeout(function() { inp.focus(); }, 80);
  }
  function reset() { msgs.innerHTML = ''; ctx = {}; setTimeout(initBot, 200); }

  // Abertura
  function openChat() {
    win.classList.remove('hidden');
    greeting.classList.add('hidden'); dot.classList.add('hidden');
    if (msgs.children.length === 0) initBot();
  }
  document.getElementById('lus-toggle').onclick = function() {
    if (win.classList.contains('hidden')) openChat(); else win.classList.add('hidden');
  };
  greeting.onclick = openChat;
  document.getElementById('lus-close').onclick = function() { win.classList.add('hidden'); };

  // ── MENU PRINCIPAL ─────────────────────────────────────────────────────
  function initBot() {
    clr();
    addMsg('Ol\u00e1! &#x1F44B; Sou a <strong>Lusitana</strong>, assistente da Papelaria Lusitana.<br>Como posso ajudar?');
    showMenu();
  }

  function showMenu() {
    clr();
    btn('&#x1F4DA; Livros e Manuais', '', function() { addMsg('Livros e Manuais','user'); infoLivros(); });
    btn('&#x270F;&#xFE0F; Material Escolar', '', function() { addMsg('Material Escolar','user'); infoMaterialEscolar(); });
    btn('&#x1F5A8;&#xFE0F; C\u00f3pias e Impress\u00f5es', '', function() { addMsg('C\u00f3pias e Impress\u00f5es','user'); infoCopias(); });
    btn('&#x1F3A8; Material de Arte', '', function() { addMsg('Material de Arte','user'); infoArte(); });
    btn('&#x1F5DE;&#xFE0F; Jornais e Revistas', '', function() { addMsg('Jornais e Revistas','user'); infoJornais(); });
    btn('&#x1F4DE; Contactar a loja', '', function() { addMsg('Contactos','user'); showContactos(); });
    btn('&#x1F552; Hor\u00e1rio e morada', '', function() { addMsg('Hor\u00e1rio','user'); showInfo(); });
  }

  // ── PAGINAS DE INFO ────────────────────────────────────────────────────
  // Cada servico mostra info + opcao encomendar + voltar

  function infoLivros() {
    addMsg('&#x1F4DA; <strong>Livros e Manuais</strong><br><br>' +
      'Dispomos de uma vasta sele\u00e7\u00e3o de livros e podemos encomendar <strong>qualquer t\u00edtulo</strong> que n\u00e3o tenhamos em loja.<br><br>' +
      '&#x2022; Manuais escolares (todos os anos)<br>' +
      '&#x2022; Literatura portuguesa e estrangeira<br>' +
      '&#x2022; Livros t\u00e9cnicos e acad\u00e9micos<br>' +
      '&#x2022; Livros infantis e juvenis');
    clr();
    ctx.categoria = 'Livros e Manuais';
    btn('&#x1F4E6; Encomendar livro', 'primary', function() { addMsg('Quero encomendar','user'); stepTitulo(); });
    btn('&#x2190; Ver outros servi\u00e7os', 'ghost', function() { addMsg('Voltar','user'); reset(); });
  }

  function infoMaterialEscolar() {
    addMsg('&#x270F;&#xFE0F; <strong>Material Escolar</strong><br><br>' +
      'Temos todo o material necess\u00e1rio para o ano letivo:<br><br>' +
      '&#x2022; Cadernos, blocos e folhas<br>' +
      '&#x2022; Canetas, l\u00e1pis e marcadores<br>' +
      '&#x2022; Colas, tesouras e r\u00e9guas<br>' +
      '&#x2022; Capas, separadores e d\u00f3ssiers<br>' +
      '&#x2022; Calculadoras e material t\u00e9cnico<br>' +
      '&#x2022; Mochilas e estojos');
    clr();
    ctx.categoria = 'Material Escolar';
    btn('&#x1F4E6; Encomendar material', 'primary', function() { addMsg('Quero encomendar','user'); stepNome(); });
    btn('&#x2190; Ver outros servi\u00e7os', 'ghost', function() { addMsg('Voltar','user'); reset(); });
  }

  function infoCopias() {
    addMsg('&#x1F5A8;&#xFE0F; <strong>C\u00f3pias e Impress\u00f5es</strong><br><br>' +
      'Servi\u00e7o r\u00e1pido de impress\u00e3o e reprografia:<br><br>' +
      '&#x2022; Fotoc\u00f3pias a preto e branco<br>' +
      '&#x2022; Impress\u00e3o a cores<br>' +
      '&#x2022; Impress\u00e3o de documentos e PDFs<br>' +
      '&#x2022; Encaderna\u00e7\u00e3o e plastifica\u00e7\u00e3o<br>' +
      '&#x2022; Formato A4 e A3<br><br>' +
      '<small>Visite-nos ou contacte-nos para or\u00e7amento.</small>');
    clr();
    ctx.categoria = 'C\u00f3pias e Impress\u00f5es';
    btn('&#x1F4E6; Solicitar or\u00e7amento', 'primary', function() { addMsg('Quero or\u00e7amento','user'); stepNome(); });
    btn('&#x2190; Ver outros servi\u00e7os', 'ghost', function() { addMsg('Voltar','user'); reset(); });
  }

  function infoArte() {
    addMsg('&#x1F3A8; <strong>Material de Arte e Papelaria</strong><br><br>' +
      'Para artistas e criativos de todos os n\u00edveis:<br><br>' +
      '&#x2022; Tintas, pinceis e palhetas<br>' +
      '&#x2022; Telas, pap\u00e9is e cartolinas<br>' +
      '&#x2022; L\u00e1pis de cor, pasteis e aquarelas<br>' +
      '&#x2022; Material de scrapbooking<br>' +
      '&#x2022; Embrulhos e artigos de oferta');
    clr();
    ctx.categoria = 'Material de Arte';
    btn('&#x1F4E6; Encomendar material', 'primary', function() { addMsg('Quero encomendar','user'); stepNome(); });
    btn('&#x2190; Ver outros servi\u00e7os', 'ghost', function() { addMsg('Voltar','user'); reset(); });
  }

  function infoJornais() {
    addMsg('&#x1F5DE;&#xFE0F; <strong>Jornais e Revistas</strong><br><br>' +
      'Assinatura e venda de publica\u00e7\u00f5es:<br><br>' +
      '&#x2022; Principais jornais nacionais<br>' +
      '&#x2022; Imprensa regional e local<br>' +
      '&#x2022; Revistas de especialidade<br>' +
      '&#x2022; Publica\u00e7\u00f5es internacionais<br><br>' +
      '<small>Dispon\u00edveis diariamente na loja.</small><br><br>' +
      '&#x1F4DE; <a href="tel:+351930505242">+351 930 505 242</a><br>' +
      '&#x1F4DE; <a href="tel:+351233422208">+351 233 422 208</a><br>' +
      '&#x2709;&#xFE0F; <a href="mailto:papelarialusitana@gmail.com">papelarialusitana@gmail.com</a>');
    clr();
    btn('&#x2190; Ver outros servi\u00e7os', 'ghost', function() { addMsg('Voltar','user'); reset(); });
  }

  // ── FLUXO DE ENCOMENDA COM VALIDAÇÃO E SEGURANÇA ─────────────────────
  function stepTitulo() {
    addMsg('Qual é o <strong>título ou ISBN</strong> do livro que deseja encomendar?');
    setTimeout(function() {
      askInput('Título ou ISBN...', function(v) {
        if (v.length < 2) {
          addMsg('⚠️ Por favor, insira um título ou ISBN válido.');
          setTimeout(stepTitulo, 600);
          return;
        }
        ctx.detalhe = escapeHTML(v);
        stepNome();
      });
    }, 550);
  }

  function stepNome() {
    addMsg('Qual é o seu <strong>nome</strong>?');
    setTimeout(function() {
      askInput('O seu nome...', function(v) {
        if (v.length < 2) {
          addMsg('⚠️ Por favor, insira um nome válido (pelo menos 2 letras).');
          setTimeout(stepNome, 600);
          return;
        }
        ctx.nome = escapeHTML(v);
        stepContacto();
      });
    }, 550);
  }

  function stepContacto() {
    addMsg('Qual o seu <strong>email ou número de telefone</strong> para entrarmos em contacto?');
    setTimeout(function() {
      askInput('Email ou telefone...', function(v) {
        var clean = v.trim();
        if (!isValidEmail(clean) && !isValidPhone(clean)) {
          addMsg('⚠️ <strong>Contacto inválido.</strong><br><small style="color:#66695C">Por favor insira um email correto (ex: nome@email.com) ou telefone válido (ex: 930 505 242).</small>');
          setTimeout(stepContacto, 600);
          return;
        }
        ctx.contacto = escapeHTML(clean);
        enviarPedido();
      });
    }, 550);
  }

  function enviarPedido() {
    clr();
    addMsg('A enviar o seu pedido\u2026 &#x23F3;');
    var fd = new FormData();
    fd.append('nome', ctx.nome);
    fd.append('contacto', ctx.contacto);
    fd.append('categoria', ctx.categoria || '');
    fd.append('detalhe', ctx.detalhe || '');
    fd.append('_subject', 'Pedido via site \u2014 ' + (ctx.categoria||'') + ' \u2014 ' + ctx.nome);
    fd.append('_captcha', 'false');
    fd.append('_template', 'table');

    fetch('https://formsubmit.co/ajax/papelarialusitana@gmail.com', {
      method: 'POST', body: fd, headers: { 'Accept': 'application/json' }
    }).then(function() {
      clr();
      addMsg('&#x2705; Pedido enviado! Obrigado, <strong>' + ctx.nome + '</strong>.<br><small style="color:#66695C">Entraremos em contacto em breve. &#x1F33F;</small>');
      btn('&#x21BA; Nova consulta', 'ghost', reset);
    }).catch(function() {
      var sub = encodeURIComponent('Pedido de ' + ctx.nome + ' \u2014 ' + (ctx.categoria||''));
      var bod = encodeURIComponent('Nome: ' + ctx.nome + '\nContacto: ' + ctx.contacto + '\nCategoria: ' + (ctx.categoria||'') + '\nDetalhe: ' + (ctx.detalhe||''));
      clr();
      addMsg('&#x1F4E7; Abra o email j\u00e1 preenchido:');
      var a = document.createElement('a');
      a.className = 'lus-btn primary';
      a.innerHTML = '&#x1F4E7; Abrir email preparado';
      a.href = 'mailto:papelarialusitana@gmail.com?subject=' + sub + '&body=' + bod;
      actions.appendChild(a);
      btn('&#x21BA; Nova consulta', 'ghost', reset);
    });
  }

  // ── CONTACTOS ──────────────────────────────────────────────────────────
  function showContactos() {
    addMsg('&#x1F4DE; <strong>Contactos da loja:</strong>');
    clr();
    link('&#x1F4DE; +351 930 505 242', 'tel:+351930505242', 'primary');
    link('&#x1F4DE; +351 233 422 208', 'tel:+351233422208', '');
    link('&#x2709;&#xFE0F; papelarialusitana@gmail.com', 'mailto:papelarialusitana@gmail.com', '');
    btn('&#x2190; Ver servi\u00e7os', 'ghost', reset);
  }

  // ── HORARIO ────────────────────────────────────────────────────────────
  function showInfo() {
    addMsg('&#x1F4CD; <strong>Morada:</strong><br>Rua da Rep\u00fablica 224, Figueira da Foz<br><br>' +
      '&#x23F0; <strong>Hor\u00e1rio:</strong><br>' +
      'Seg\u2013Sex: 09:00\u201313:00 / 15:00\u201319:00<br>S\u00e1b: 09:00\u201313:00');
    clr();
    btn('&#x2190; Ver servi\u00e7os', 'ghost', reset);
  }

  // Mensajes aleatorios de llamada a la acción (foco en librería/papelería)
  var GREETINGS = [
    'Procura um livro ou manual escolar? &#x1F4DA;',
    'Encomende manuais e livros aqui! &#x2728;',
    'Precisa de fotoc\u00f3pias ou impress\u00f5es? &#x1F5A8;&#xFE0F;',
    'Precisa de material escolar ou de arte? &#x1F392;',
    'Fale connosco para encomendas r\u00e1pidas! &#x1F4AC;',
    'Precisa de encomendar algum artigo? &#x1F4E6;'
  ];

  var greetingSpan = greeting.querySelector('span');

  // Fase 1: Después de 3 segundos, se muestra el indicador de escritura (puntos verdes animados)
  setTimeout(function() {
    if (win.classList.contains('hidden')) {
      greetingSpan.innerHTML = '<span class="lus-greeting-dots"><span></span><span></span><span></span></span>';
      greeting.classList.remove('hidden');
      dot.classList.remove('hidden');

      // Fase 2: 1.5 segundos después, los puntos se convierten en la frase aleatoria
      setTimeout(function() {
        if (win.classList.contains('hidden')) {
          var randomMsg = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
          greetingSpan.innerHTML = randomMsg;
        }
      }, 1500);
    }
  }, 3000);

})();
