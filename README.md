# Movimento por Grades Mais Flexíveis no DAINF

Projeto para reunir, analisar e apresentar de forma interativa os dados da pesquisa sobre as dificuldades enfrentadas por alunos do DAINF com as grades horárias. O site visa apoiar a busca por horários mais flexíveis, informando e fortalecendo a mobilização estudantil por melhorias reais.

## 📁 **Estrutura do Projeto**

```
RelatorioUTFPR/
├── index.html              # Página de redirecionamento
├── pages/
│   ├── home.html          # Página inicial com métricas e gráficos
│   ├── reports.html       # Página de relatos anônimos
│   └── report.html        # Página de relatório detalhado
├── assets/
│   ├── css/
│   │   └── style.css      # Estilos customizados
│   ├── js/
│   │   ├── app.js         # Aplicação principal
│   │   ├── config.js      # Configurações globais
│   │   ├── dataService.js # Serviço de dados
│   │   ├── statsService.js # Serviço de estatísticas
│   │   ├── chartService.js # Serviço de gráficos
│   │   ├── uiService.js   # Serviço de interface
│   │   ├── utils.js       # Utilitários
│   │   ├── reports.js     # Lógica da página de relatos
│   │   ├── report.js      # Lógica da página de relatório
│   │   └── tailwind-config.js # Configuração do Tailwind
│   └── data/
└── README.md
```

##**Tecnologias Utilizadas**

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos customizados
- **Tailwind CSS**: Framework CSS via CDN com cores customizadas
- **JavaScript ES6+**: Lógica da aplicação
- **Chart.js**: Gráficos interativos
- **Google Sheets API**: Fonte de dados

## **Funcionalidades**

### **Página Inicial (home.html)**

- Métricas principais (total de respostas, % que cogitaram trancar)
- Gráficos interativos (razões, cursos, horários, etc)
- Relatos em destaque
- Navegação para outras páginas

### **Página de Relatos (reports.html)**

- Lista completa de relatos anônimos
- Busca por palavras-chave

### **Página de Relatório (report.html)**

- Em construição

## **Dados**

Os dados são carregados de uma planilha do Google Sheets e incluem:

- Informações demográficas dos alunos
- Dificuldades enfrentadas com horários
- Relatos anônimos
- Estatísticas de trancamento
