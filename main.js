(function () {
  const usuarioManager = {
    CHAVE_USUARIOS: "petvet_usuarios",
    CHAVE_LOGADO: "petvet_usuario_logado",

    init() {
      const lista = this.getUsuarios();
      if (!lista.find((u) => u.email === "admin@petvet.com")) {
        lista.push(
          {
            id: 1,
            nome: "Admin PetVet",
            email: "admin@petvet.com",
            senha: "admin123",
            cpf: "000.000.000-00",
            telefone: "(11) 00000-0000",
            tipo: "admin",
            dataCadastro: new Date().toISOString(),
            status: "ativo",
          },
          {
            id: 2,
            nome: "Usuário Teste",
            email: "usuario@teste.com",
            senha: "123456",
            cpf: "111.111.111-11",
            telefone: "(11) 11111-1111",
            tipo: "usuario",
            dataCadastro: new Date().toISOString(),
            status: "ativo",
          }
        );
        localStorage.setItem(this.CHAVE_USUARIOS, JSON.stringify(lista));
      }
    },

    getUsuarios() {
      return JSON.parse(localStorage.getItem(this.CHAVE_USUARIOS) || "[]");
    },

    login(email, senha) {
      const u = this.getUsuarios().find(
        (u) => u.email === email && u.senha === senha && u.status === "ativo"
      );
      if (u) {
        localStorage.setItem(this.CHAVE_LOGADO, JSON.stringify(u));
        return { sucesso: true, usuario: u };
      }
      return { sucesso: false, mensagem: "Email ou senha incorretos." };
    },

    logout() {
      localStorage.removeItem(this.CHAVE_LOGADO);
      window.location.href = "login.html";
    },

    estaLogado() {
      return !!localStorage.getItem(this.CHAVE_LOGADO);
    },

    isAdmin() {
      const u = JSON.parse(localStorage.getItem(this.CHAVE_LOGADO) || "null");
      return u && u.tipo === "admin";
    },

    getUsuarioAtual() {
      return JSON.parse(localStorage.getItem(this.CHAVE_LOGADO) || "null");
    },

    cadastrar(dados) {
      const lista = this.getUsuarios();
      if (lista.find((u) => u.email === dados.email)) {
        return { sucesso: false, mensagem: "Este e-mail já está cadastrado." };
      }
      if (lista.find((u) => u.cpf === dados.cpf)) {
        return { sucesso: false, mensagem: "Este CPF já está cadastrado." };
      }
      const novo = {
        id: Date.now(),
        tipo: "usuario",
        status: "ativo",
        dataCadastro: new Date().toISOString(),
        ...dados,
      };
      lista.push(novo);
      localStorage.setItem(this.CHAVE_USUARIOS, JSON.stringify(lista));
      return { sucesso: true, usuario: novo };
    },

    atualizar(id, dados) {
      const lista = this.getUsuarios();
      const idx = lista.findIndex((u) => u.id === id);
      if (idx === -1) return false;
      lista[idx] = { ...lista[idx], ...dados };
      localStorage.setItem(this.CHAVE_USUARIOS, JSON.stringify(lista));
      const logado = this.getUsuarioAtual();
      if (logado && logado.id === id) {
        localStorage.setItem(this.CHAVE_LOGADO, JSON.stringify(lista[idx]));
      }
      return true;
    },

    deletar(id) {
      const lista = this.getUsuarios().filter((u) => u.id !== id);
      localStorage.setItem(this.CHAVE_USUARIOS, JSON.stringify(lista));
    },
  };

  const rotas = {
    "/": "index.html",
    "/login": "login.html",
    "/cadastro": "cadastro.html",
    "/agendar-consulta": "agendar-consulta.html",
    "/encontrar-veterinario": "encontrar-veterinario.html",
    "/resultados-exames": "resultados-exames.html",
    "/meu-prontuario": "meu-prontuario.html",
    "/importar-exames": "importar-exames.html",
    "/admin": "admin-dashboard.html",
    "/api-publica": "api-publica.html",
  };

  function irPara(rota) {
    window.location.href = rotas[rota] || "index.html";
  }

  function initTema() {
    if (localStorage.getItem("petvet_tema") === "escuro") {
      document.body.classList.add("escuro");
    }
    document
      .querySelectorAll(".botao-tema, .botao-tema-inicial")
      .forEach((btn) => {
        btn.textContent = document.body.classList.contains("escuro")
          ? "☀️"
          : "🌙";
        btn.addEventListener("click", () => {
          document.body.classList.toggle("escuro");
          const escuro = document.body.classList.contains("escuro");
          localStorage.setItem("petvet_tema", escuro ? "escuro" : "claro");
          document
            .querySelectorAll(".botao-tema, .botao-tema-inicial")
            .forEach((b) => (b.textContent = escuro ? "☀️" : "🌙"));
        });
      });
  }

  function initCards() {
    document.querySelectorAll("[data-rota]").forEach((el) => {
      el.addEventListener("click", () => irPara(el.dataset.rota));
    });
    document.querySelectorAll("[data-navegar]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        irPara(el.dataset.navegar);
      });
    });
  }

  function initLogout() {
    document.querySelectorAll(".botao-logout-usuario").forEach((btn) => {
      btn.addEventListener("click", () => usuarioManager.logout());
    });
  }

  usuarioManager.init();

  document.addEventListener("DOMContentLoaded", () => {
    initTema();
    initCards();
    initLogout();
  });

  window.petvet = { usuarioManager, irPara };
})();
