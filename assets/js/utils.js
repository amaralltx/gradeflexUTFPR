// utils.js - Funções utilitárias

// Remove espaços extras e normaliza string para chave
export const normalize = (str) => str.trim();

// Quebra o texto em múltiplas linhas para o Chart.js
export function breakLabel(text, maxLineLength = 30) {
  const words = text.split(' ');
  let lines = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length > maxLineLength) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += ' ' + word;
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  return lines;
}
