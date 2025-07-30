// config.js - Configurações globais da aplicação

// URL da API do Google Sheets
export const SHEET_URL = "https://docs.google.com/spreadsheets/d/1nniFbqvNg0Rin-JoGa7KDTCUCTWhGZLKpVpoMJ4m51s/gviz/tq?tqx=out:json";

// Cores dos gráficos
export const CHART_COLORS = [
  "#D4B04A", // amarelo mostarda
  "#4A90A4", // azul acinzentado
  "#7BA05B", // verde oliva suave
  "#B85450", // rosa terroso
  "#8E7CC3", // roxo acinzentado
  "#6B9B93", // verde acinzentado
  "#CC8E35", // ocre dourado
  "#E8D5B7", // bege claro
  "#8490A0", // cinza azulado neutro
  "#A0615A", // terracota suave
  "#5A7CA8", // azul aço
  "#8B6F47", // marrom avelã
  "#B56C6C", // rosa empoeirado
  "#9D7DB2", // lavanda escura
  "#5F9A8E", // verde sage
  "#A0507A", // vinho suave
  "#7A8471",  // verde acinzentado
  "#C2906C", // bege rosado
];


// Labels fixos para o gráfico de razões
export const REASONS_LABELS = [
  "Não posso fazer a disciplina porque preciso trabalhar",
  "Não consigo fazer o estágio curricular obrigatório/não-obrigatório",
  "Tenho responsabilidades familiares ou pessoais",
  "Tenho dificuldades de concentração ou aprendizagem nesse turno",
  "Não consigo chegar a tempo/voltar para casa porque moro longe"
];

// Configurações dos gráficos
export const CHART_CONFIG = {
  defaultHeight: "400px",
  defaultMaxHeight: "400px",
  horariosHeight: "400px",
  horariosMaxHeight: "400px",
  categoriasHeight: "500px",
  categoriasMaxHeight: "500px",
  reasonsHeight: "444px",
  reasonsMaxHeight: "444px"
}; 