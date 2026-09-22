# Setup da Página de Proposta

## ✅ Arquivos Criados

- `src/components/PlanosSelector.jsx` - Componente interativo dos planos
- `src/pages/LandingPage.jsx` - Página de landing (conteúdo do App.jsx anterior)
- `src/pages/PropostaPage.jsx` - Página de proposta com seletor de planos
- `src/AppWithRouter.jsx` - App com React Router

## 📋 Passos para Testar Localmente

### 1. Instalar React Router

```bash
cd gravamais
npm install react-router-dom
```

### 2. Atualizar o main.jsx

Abra `src/main.jsx` e troque:

```javascript
// ANTES
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// DEPOIS
import AppWithRouter from './AppWithRouter.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>,
)
```

### 3. Rodar Dev Server

```bash
npm run dev
```

### 4. Testar

- **Landing Page:** http://localhost:5173/
- **Página de Proposta:** http://localhost:5173/proposta/base

## 🚀 Quando Estiver Pronto para Publicar

É só me avisar! Vou fazer:

1. ✓ Fazer build: `npm run build`
2. ✓ Deploy em `gravamaisproducoes.com.br/proposta/base`
3. ✓ Mandar o link para você compartilhar

## 📝 Futuras Mudanças

**Não precisa fazer nada no site!** Qualquer mudança que você quiser fazer:

- Edita o componente `src/components/PlanosSelector.jsx`
- Me manda a alteração
- Eu testo aqui (localhost)
- Quando tiver pronto, deployment

Isso mantém tudo organizado e sem quebrar a página de produção.
