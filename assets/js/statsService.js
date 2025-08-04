// statsService.js - Serviço para cálculos estatísticos

import { normalize } from './utils.js';

export const calculateStats = (data) => {
  const totalResponses = data.length;

  const trancarCount = data.filter((d) => {
    const field = d["Você já pensou em trancar, desistir ou mudar de curso por conta de alguma dificuldade relacionada aos horários das disciplinas?"];
    return field && field.toLowerCase().startsWith("sim");
  }).length;

  // Razões
  const reasonsFreq = {};
  data.forEach((d) => {
    const raw = d["Por qual(is) razão(ões) você tem dificuldade para ter aula nos horários selecionados?"];
    if (!raw) return;
    raw.split(/,\s*/).forEach((reason) => {
      const key = normalize(reason);
      if (key) reasonsFreq[key] = (reasonsFreq[key] || 0) + 1;
    });
  });

  // Cursos
  const courseFreq = {};
  data.forEach((d) => {
    const course = normalize(d["Qual o seu curso?"] || "Outros");
    if (course) courseFreq[course] = (courseFreq[course] || 0) + 1;
  });

  // Horários de dificuldade
  const horariosFreq = {};
  data.forEach((d) => {
    const raw = d["Ao montar sua grade do semestre, existe algum horário que dificulta ou impossibilita sua matrícula na disciplina? Qual(is)? Se não houver, marque a última caixa."];
    if (!raw) return;
    raw.split(/,\s*/).forEach((horario) => {
      const key = normalize(horario);
      if (key) horariosFreq[key] = (horariosFreq[key] || 0) + 1;
    });
  });

  // Agrupa horários em categorias
  const horariosCategorias = {
    "M1 - M3": 0,
    "M4 - M6": 0,
    "T1 - T3": 0,
    "T4 - T6": 0,
    "N1 - N5": 0
  };

  data.forEach((d) => {
    const raw = d["Ao montar sua grade do semestre, existe algum horário que dificulta ou impossibilita sua matrícula na disciplina? Qual(is)? Se não houver, marque a última caixa."];
    if (!raw) return;

    raw.split(/,\s*/).forEach((horario) => {
      const key = normalize(horario);
      if (!key) return;

      if (key.includes("M1") || key.includes("M2") || key.includes("M3")) {
        horariosCategorias["M1 - M3"]++;
      } else if (key.includes("M4") || key.includes("M5") || key.includes("M6")) {
        horariosCategorias["M4 - M6"]++;
      } else if (key.includes("T1") || key.includes("T2") || key.includes("T3")) {
        horariosCategorias["T1 - T3"]++;
      } else if (key.includes("T4") || key.includes("T5") || key.includes("T6")) {
        horariosCategorias["T4 - T6"]++;
      } else if (
        key.includes("N1") ||
        key.includes("N2") ||
        key.includes("N3") ||
        key.includes("N4") ||
        key.includes("N5")
      ) {
        horariosCategorias["N1 - N5"]++;
      }
    });
  });


  // Dados de alunos que cogitaram trancar
  const trancarData = { "Sim": 0, "Não": 0 };
  data.forEach((d) => {
    const field = d["Você já pensou em trancar, desistir ou mudar de curso por conta de alguma dificuldade relacionada aos horários das disciplinas?"];
    if (field) {
      if (field.toLowerCase().startsWith("sim")) {
        trancarData["Sim"]++;
      } else if (field.toLowerCase().startsWith("não") || field.toLowerCase().startsWith("nao")) {
        trancarData["Não"]++;
      }
    }
  });

  const reasonsSorted = Object.entries(reasonsFreq).sort((a, b) => b[1] - a[1]);
  const coursesSorted = Object.entries(courseFreq).sort((a, b) => b[1] - a[1]);

  return {
    totalResponses,
    trancarCount,
    reasonsSorted,
    coursesSorted,
    coursesData: courseFreq,
    horariosFreq,
    horariosCategorias,
    trancarData,
  };
}; 