// dataService.js - Serviço para gerenciar dados da API

import { SHEET_URL } from './config.js';

let cachedData = null;

export const fetchData = async () => {
  if (cachedData) return cachedData;

  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error("Erro ao acessar Google Sheets");

    const text = await response.text();
    const jsonStr = text.match(/setResponse\(([\s\S]+)\);?/)?.[1];
    if (!jsonStr) throw new Error("Formato inesperado da resposta do Sheets");

    // const jsonObj = JSON.parse(jsonStr);
    // console.dir(jsonObj, { depth: null });

    const { table } = JSON.parse(jsonStr);
    const headers = table.cols.map((c) => c.label.trim());

    const rows = table.rows.map((r) => {
      const rowObj = r.c.reduce((acc, cell, idx) => {
        acc[headers[idx]] = cell ? String(cell.v).trim() : "";
        return acc;
      }, {});
      delete rowObj["Informe seu RA"];
      return rowObj;
    });

    cachedData = rows;
    return rows;
  } catch (err) {
    console.error("Falha ao carregar dados:", err);
    cachedData = [];
    return [];
  }
};
