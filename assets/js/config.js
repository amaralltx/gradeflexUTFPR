// config.js - Configurações globais da aplicação

// URL da API do Google Sheets
export const SHEET_URL = "https://docs.google.com/spreadsheets/d/1nniFbqvNg0Rin-JoGa7KDTCUCTWhGZLKpVpoMJ4m51s/gviz/tq?tqx=out:json";

// Cores dos gráficos
export const CHART_COLORS = [
  "#1FB8CD",
  "#FFC185",
  "#B4413C",
  "#ECEBD5",
  "#5D878F",
  "#DB4545",
  "#D2BA4C",
  "#964325",
  "#944454",
  "#13343B",
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