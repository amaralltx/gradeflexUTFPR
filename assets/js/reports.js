/* reports.js – arquivo específico para a página de relatos
   - Carrega e exibe todos os relatos
   - Gerencia a funcionalidade de busca
*/

import { fetchData } from './dataService.js';
import { renderComments, applySearchFilter } from './uiService.js';

// ====== Inicialização ======
const init = async () => {
  try {
    // Carrega dados
    const data = await fetchData();
    
    // Renderiza relatos
    renderComments(data);
    
    // Configura event listeners
    setupEventListeners();
    
  } catch (error) {
    console.error("Erro na inicialização da página de relatos:", error);
  }
};

// ====== Event Listeners ======
const setupEventListeners = () => {
  const $searchInput = document.getElementById("searchInput");
  if ($searchInput) {
    $searchInput.addEventListener("input", applySearchFilter);
  }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", init); 