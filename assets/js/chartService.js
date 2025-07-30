// chartService.js - Serviço para criação e gerenciamento de gráficos

import { CHART_COLORS, REASONS_LABELS, CHART_CONFIG } from './config.js';
import { breakLabel } from './utils.js';

// Função auxiliar para criar gráficos de barras horizontais
export const createBarChart = (
  canvasId,
  labels,
  data,
  colors,
  maxValue,
  orientation = "horizontal",
  showLabels = false,
  customHeight
) => {
  const canvas = document.getElementById(canvasId);
  if (canvas) {
    console.log("1");
    if (customHeight) {
      console.log("2");
      canvas.setAttribute("height", customHeight);
      canvas.style.height = `${customHeight} !important`;
      canvas.style.maxHeight = customHeight;
    } else {
      console.log("3");
      canvas.height = CHART_CONFIG.defaultHeight;
      canvas.style.height = CHART_CONFIG.defaultHeight;
      canvas.style.maxHeight = CHART_CONFIG.defaultMaxHeight;
    }
  }

  return new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{ data: data, backgroundColor: colors }],
    },
    options: {
      indexAxis: orientation === "horizontal" ? "y" : "x",
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 30, right: 30 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const value = orientation === "horizontal" ? context.parsed.x : context.parsed.y;
              const percent = ((value / total) * 100).toFixed(1);
              return `${value}`;
            }
          }
        },
        datalabels: {
          anchor: 'end',
          align: orientation === "horizontal" ? 'right' : 'top',
          formatter: function (value, context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percent = ((value / total) * 100).toFixed(1);
            return `${value}`;
          },
          color: '#0d1017',
          font: { weight: 'medium', size: 14 }
        }
      },
      scales: {
        x: {
          min: 0,
          max: maxValue,
          ticks: { font: { size: 11 } }
        },
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
            callback: orientation === "horizontal" ? function (value, index) {
              return labels[index] || "";
            } : function () { return ""; }
          }
        },
      },
    },
    plugins: [ChartDataLabels]
  });
};


// Função auxiliar para criar gráficos pie
export const createPieChart = (canvasId, labels, data, colors) => {
  const canvas = document.getElementById(canvasId);
  if (canvas) {
    canvas.style.height = CHART_CONFIG.defaultHeight;
    canvas.style.maxHeight = CHART_CONFIG.defaultMaxHeight;
  }

  return new Chart(canvas.getContext("2d"), {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{ data: data, backgroundColor: colors }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const value = context.parsed;
              const percent = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} (${percent}%)`;
            }
          }
        },
        datalabels: {
          formatter: function (value, context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percent = ((value / total) * 100).toFixed(1);
            return `${percent}%`;
          },
          color: '#fff',
          font: { weight: 'bold', size: 14 }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
};

// Função para extrair apenas a sigla do horário
const extractTimeSlot = (horario) => {
  // Extrai apenas a sigla (T1, T2, M1, M2, N1, etc.)
  // Procura por padrões como "T1", "M1", "N1", etc.
  const match = horario.match(/([MTN]\d+)/);
  if (match) {
    return match[1];
  }

  // Se não encontrar o padrão, tenta extrair outras informações úteis
  // Remove informações extras como horários e mantém apenas a parte principal
  let cleanHorario = horario.replace(/\s*\|\s*\d{1,2}h\d{2}\s*-\s*\d{1,2}h\d{2}/, '');
  cleanHorario = cleanHorario.replace(/\s*\(\d{1,2}h\d{2}\s*-\s*\d{1,2}h\d{2}\)/g, '');
  cleanHorario = cleanHorario.trim();

  // Se ainda estiver muito longo, pega apenas as primeiras palavras
  if (cleanHorario.length > 10) {
    const words = cleanHorario.split(' ');
    return words.slice(0, 2).join(' ');
  }

  return cleanHorario;
};

export const renderCharts = (stats, cachedData) => {
  // --- Cursos Pie Chart ---
  const coursesLabels = stats.coursesSorted.map((c) => c[0]);
  const coursesData = stats.coursesSorted.map((c) => c[1]);
  createPieChart("coursesChart", coursesLabels, coursesData, CHART_COLORS.slice(0, coursesLabels.length));

  // --- Razões Bar Chart ---
  const data = cachedData || [];
  const reasonsCounts = REASONS_LABELS.map((label) => {
    let count = 0;
    data.forEach((d) => {
      const raw = d["Por qual(is) razão(ões) você tem dificuldade para ter aula nos horários selecionados?"];
      if (!raw) return;
      if (raw.includes(label)) count++;
    });
    return count;
  });

  const reasonsPairs = REASONS_LABELS.map((label, i) => [label, reasonsCounts[i]]);
  const reasonsSorted = reasonsPairs.sort((a, b) => b[1] - a[1]);
  const reasonsLabelsSorted = reasonsSorted.map(([label]) => breakLabel(label));
  const reasonsCountsSorted = reasonsSorted.map(([_, count]) => count);
  const reasonsColors = CHART_COLORS.slice(0, reasonsLabelsSorted.length);

  createBarChart("reasonsChart", reasonsLabelsSorted, reasonsCountsSorted, reasonsColors, Math.max(...reasonsCounts) + 20, "vertical", true, CHART_CONFIG.reasonsHeight);
  // --- Horários Bar Chart ---
  const horariosSorted = Object.entries(stats.horariosFreq).sort((a, b) => b[1] - a[1]);
  const horariosLabels = horariosSorted.map((h) => extractTimeSlot(h[0]));
  const horariosData = horariosSorted.map((h) => h[1]);
  const horariosColors = CHART_COLORS.slice(0, horariosLabels.length);

  createBarChart("horariosChart", horariosLabels, horariosData, horariosColors, Math.max(...horariosData) + 50, true);

  // --- Categorias de Horários Bar Chart ---
  const categoriasLabels = Object.keys(stats.horariosCategorias);
  const categoriasData = Object.values(stats.horariosCategorias);
  const categoriasColors = CHART_COLORS.slice(0, categoriasLabels.length);

  createBarChart("categoriasChart", categoriasLabels, categoriasData, categoriasColors, Math.max(...categoriasData) + 130, true);

  // --- Trancamento Pie Chart ---
  const trancarLabels = Object.keys(stats.trancarData);
  const trancarValues = Object.values(stats.trancarData);
  const trancarColors = ["#b56262", "#62a8b5"];

  createPieChart("trancarChart", trancarLabels, trancarValues, trancarColors);
}; 