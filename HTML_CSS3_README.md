# PetVet - Versão HTML/CSS3

Versão puramente HTML5, CSS3 e JavaScript vanilla do sistema de gerenciamento de clínica veterinária **PetVet**.

## 📋 Descrição

PetVet é uma aplicação web completa para gerenciamento de clínicas veterinárias, permitindo:

- **Autenticação de Usuários**: Login seguro com suporte a admin e usuários comuns
- **Agendamento de Consultas**: Interface intuitiva para agendar consultas veterinárias
- **Gestão de Prontuários**: Histórico médico detalhado dos animais
- **Resultados de Exames**: Visualização e compartilhamento de resultados
- **Importação de Exames**: Upload de exames externos em formato digital
- **Painel Administrativo**: Dashboard completo para administradores
- **Tema Claro/Escuro**: Suporte a tema claro e escuro com persistência em localStorage
- **Responsividade Total**: Design adaptável para todos os dispositivos

## 🚀 Começando

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Nenhuma dependência externa ou servidor necessário

### Como Usar

1. **Abrir o projeto**:
   - Abra o arquivo `login.html` no navegador
   - Ou comece em `index.html` se já estiver logado

2. **Credenciais de Teste**:
   - **Admin**: `admin@petvet.com` / `admin123`
   - **Usuário**: `usuario@teste.com` / `123456`

3. **Explorar as funcionalidades**:
   - Dashboard principal
   - Agendamento de consultas
   - Visualização de exames
   - Prontuários dos animais
   - Painel administrativo (apenas admin)

## 📁 Estrutura do Projeto

```
PetVet/
├── index.html                  # Página inicial (Tela Inicial)
├── login.html                  # Página de login
├── agendar-consulta.html       # Agendamento de consultas
├── encontrar-veterinario.html  # Busca de veterinários
├── resultados-exames.html      # Visualização de exames
├── meu-prontuario.html         # Prontuário do animal
├── importar-exames.html        # Import de exames externos
├── admin-dashboard.html        # Painel administrativo
├── template.html               # Template para novas páginas
├── styles.css                  # Estilos CSS3 (temas, responsividade)
├── main.js                     # JavaScript para lógica da aplicação
└── README.md                   # Este arquivo
```

## 🎨 Arquitetura de Estilos

### Variáveis CSS

O projeto usa **CSS Variables** para gerenciar cores, espaçamentos e temas:

```css
:root {
  --cor-primaria: #2e9e5b;
  --cor-texto: #333333;
  --raio-borda: 12px;
  /* ... mais variáveis */
}

body.escuro {
  --cor-primaria: #3eb370;
  --cor-texto: #f8f9fa;
  /* ... cores do tema escuro */
}
```

### Classes Utilitárias

Classe disponíveis para uso rápido:

- `.botao-principal` - Botão principal com cor primária
- `.botao-secundario` - Botão secundário
- `.card-destaque` - Card destacado com background especial
- `.card-servico` - Card de serviço padrão
- `.flex-centro` - Flexbox centralizado
- `.gap-md`, `.gap-lg` - Espaçamento entre elementos
- `.w-100` - Largura 100%
- `.mt-md`, `.mb-lg` - Margens

## 🔧 Funcionalidades JavaScript

### TemaManager
Gerencia o tema claro/escuro do aplicativo:

```javascript
// Alternando tema
window.petvet.temaManager.alternarTema();

// Tema atual
console.log(window.petvet.temaManager.tema); // 'claro' ou 'escuro'
```

### UsuarioManager
Gerencia o estado do usuário logado:

```javascript
// Verificar se logado
if (window.petvet.usuarioManager.estaLogado()) {
  console.log("Usuário logado");
}

// Obter dados do usuário
const usuario = window.petvet.usuarioManager.obterUsuario();

// Fazer logout
window.petvet.usuarioManager.deslogarUsuario();
```

### NavegadorPage
Gerencia navegação e rotas protegidas:

```javascript
// Navegar para rota
window.petvet.navegador.navegarPara('/agendar-consulta');

// Verificar acesso
if (window.petvet.navegador.verificarAcesso('/admin/dashboard')) {
  // Acesso permitido
}
```

## 📱 Responsividade

O design é completamente responsivo com breakpoints em:
- **768px**: Tablets e laptops
- **480px**: Celulares pequenos

Todos os elementos (grids, tabelas, formulários) se adaptam automaticamente.

## 🔐 Autenticação e Segurança

- **localStorage**: Dados de usuário armazenados no navegador
- **Proteção de Rotas**: Rotas protegidas redirecionam para login
- **Verificação de Admin**: Apenas admins acessam painel administrativo

**Nota**: Esta é uma aplicação de demonstração. Para produção, implemente:
- Autenticação de servidor
- Criptografia de dados sensíveis
- HTTPS em todas as requisições
- JWT tokens

## 📊 Dados e Persistência

Os dados são armazenados em **localStorage** do navegador:

```javascript
// Exemplo: Salvar agendamento
const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
agendamentos.push(novoAgendamento);
localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
```

## 🛠️ Como Criar Novas Páginas

1. **Copie o `template.html`**:
   ```html
   <!DOCTYPE html>
   <html lang="pt-BR">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>PetVet - Nova Página</title>
     <link rel="stylesheet" href="styles.css" />
   </head>
   <body>
     <div class="app">
       <!-- Cabeçalho -->
       <header class="cabecalho">
         <a href="#" data-navegar="/" class="botao-voltar">
           <span class="seta-voltar">←</span>
         </a>
         <h1>Título</h1>
         <button class="botao-tema">🌙</button>
       </header>

       <!-- Conteúdo -->
       <main class="conteudo-principal">
         <!-- Seu conteúdo -->
       </main>
     </div>

     <script src="main.js"></script>
     <script>
       // Proteção de rota
       document.addEventListener('DOMContentLoaded', function() {
         if (!window.petvet.usuarioManager.estaLogado()) {
           window.location.href = 'login.html';
         }
       });
     </script>
   </body>
   </html>
   ```

2. **Registre a rota** em `main.js`:
   ```javascript
   const mapeamento = {
     '/sua-pagina': 'sua-pagina.html',
     // ...
   };
   ```

3. **Use os estilos CSS** já disponíveis

## 🎯 Exemplos de Uso

### Criar um Botão que Navega
```html
<button onclick="window.petvet.irPara('/agendar-consulta')">
  Agendar
</button>
```

### Criar um Card
```html
<div class="card-servico" data-rota="/resultados-exames">
  <h3 class="titulo-servico">Meus Resultados</h3>
  <p class="descricao-servico">Visualize seus exames</p>
</div>
```

### Usar Tema Escuro
```html
<button class="botao-tema" onclick="window.petvet.alternarTema()">
  🌙
</button>
```

### Formulário com Validação
```html
<form onsubmit="handleSubmit(event)">
  <div class="campo-formulario">
    <label for="email">Email</label>
    <input type="email" id="email" required />
  </div>
  <button type="submit" class="botao-principal">Enviar</button>
</form>
```

## 🔄 Navegação Entre Páginas

Use `data-navegar` ou `onclick`:

```html
<!-- Com data-navegar -->
<a href="#" data-navegar="/agendar-consulta">Agendar</a>

<!-- Com onclick -->
<button onclick="window.petvet.irPara('/encontrar-veterinario')">
  Encontrar Veterinário
</button>
```

## 🎨 Customização de Cores

Edite `styles.css` para alterar as cores:

```css
:root {
  --cor-primaria: #2e9e5b;        /* Verde - cor principal */
  --cor-secundaria: #3aa0b9;      /* Azul - cor secundária */
  --cor-erro: #e74c3c;            /* Vermelho - erros */
  --cor-sucesso: #27ae60;         /* Verde - sucesso */
  --cor-aviso: #f39c12;           /* Laranja - avisos */
}
```

## 📚 Componentes Disponíveis

### Cards
- `.card-destaque` - Card com fundo destacado
- `.card-servico` - Card de serviço padrão

### Botões
- `.botao-principal` - Botão primário
- `.botao-secundario` - Botão secundário
- `.botao-tema` - Botão para alternar tema
- `.botao-logout-usuario` - Botão de logout

### Formulários
- `.campo-formulario` - Container do campo
- `.mensagem-erro` - Mensagem de erro
- `.mensagem-sucesso` - Mensagem de sucesso

### Utilitários
- `.hidden` - Ocultar elemento
- `.flex-centro` - Flexbox centralizado
- `.gap-*` - Espaçamento (sm, md, lg)
- `.mt-*`, `.mb-*` - Margens (sm, md, lg)
- `.p-*` - Padding (sm, md, lg)

## 🚀 Melhorias Futuras

- [ ] Integração com Backend/API
- [ ] Autenticação com JWT
- [ ] Banco de dados real
- [ ] Notificações em tempo real
- [ ] Exportação de relatórios
- [ ] Integração com email
- [ ] App mobile com React Native
- [ ] PWA (Progressive Web App)

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se o navegador é moderno
2. Limpe o cache (Ctrl+Shift+Delete)
3. Verifique o console (F12) para erros
4. Confira as credenciais de teste

## 📄 Licença

Este projeto é fornecido como exemplo educacional.

## 🤝 Contribuições

Sinta-se livre para:
- Adicionar novas páginas
- Melhorar os estilos
- Corrigir bugs
- Adicionar funcionalidades

---

**Desenvolvido com ❤️ para PetVet**

Versão: 1.0.0  
Atualizado: 2025-04-27
