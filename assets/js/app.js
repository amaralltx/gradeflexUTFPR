/* app.js – arquivo principal da aplicação (página inicial)
   - Orquestra a inicialização da aplicação
   - Coordena os diferentes serviços
   - Renderiza gráficos e métricas da página inicial
*/

import { fetchData } from './dataService.js';
import { calculateStats } from './statsService.js';
import { renderCharts } from './chartService.js';
import { renderMetrics } from './uiService.js';

// ====== Inicialização ======
const init = async () => {
  try {
    // Carrega dados
    const data = await fetchData();
    
    // Calcula estatísticas
    const stats = calculateStats(data);
    
    // Renderiza interface
    renderMetrics(stats);
    renderCharts(stats, data);
    
  } catch (error) {
    console.error("Erro na inicialização:", error);
  }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", init);