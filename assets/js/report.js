/* report.js – arquivo específico para a página de relatório
   - Carrega e exibe dados do relatório completo
   - Renderiza análises detalhadas
*/

import { fetchData } from './dataService.js';
import { calculateStats } from './statsService.js';
import { renderReportSection } from './uiService.js';

// ====== Inicialização ======
const init = async () => {
  try {
    // Carrega dados
    const data = await fetchData();
    
    // Calcula estatísticas
    const stats = calculateStats(data);
    
    // Renderiza relatório
    renderReportSection(stats, data);
    
  } catch (error) {
    console.error("Erro na inicialização da página de relatório:", error);
  }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", init); 