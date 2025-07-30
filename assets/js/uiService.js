// uiService.js - Serviço para gerenciar interface do usuário

const COMMENTS_PER_PAGE = 5;
// Seletores DOM
const $totalResponses = document.getElementById("totalResponses");
const $trancarPercent = document.getElementById("trancarPercent");
const $topReasons = document.getElementById("topReasons");
const $commentsContainer = document.getElementById("commentsContainer");

// Seletores do relatório
const $reportTotalResponses = document.getElementById("reportTotalResponses");
const $reportTrancarPercent = document.getElementById("reportTrancarPercent");
const $reportAvgDifficulty = document.getElementById("reportAvgDifficulty");

export const renderMetrics = (stats) => {
  const { totalResponses, trancarCount, reasonsSorted } = stats;

  if (totalResponses === 0) {
    $totalResponses.textContent = "0";
    $trancarPercent.textContent = "0%";
    $topReasons.textContent = "Sem dados";
    return;
  }

  $totalResponses.textContent = totalResponses;
  const percent = ((trancarCount / totalResponses) * 100).toFixed(1);
  $trancarPercent.textContent = `${percent}%`;
  const top3 = reasonsSorted.slice(0, 3).map((r) => `${r[0]}`);
  $topReasons.innerHTML = top3.join("<div class='border-b border-custom-card-border mt-2 mb-2'></div>");
};

// Variáveis para paginação
let allComments = []; // Armazena todos os comentários
let filteredComments = []; // Comentários após aplicar filtro
let currentPage = 0; // Página atual (baseada em 0)

export const renderComments = (data) => {
  if (!$commentsContainer) return;

  // Extrai e filtra comentários válidos
  allComments = data
    .map(row => row["Você gostaria de compartilhar algum comentário/relato/reclamação?"])
    .filter(comment => comment && comment.trim().length > 0)
    .map(comment => comment.trim());

  // Inicializa comentários filtrados com todos os comentários
  filteredComments = [...allComments];
  currentPage = 0;

  renderCurrentPage();
};

const renderCurrentPage = () => {
  if (!$commentsContainer) return;

  const totalPages = Math.max(1, Math.ceil(filteredComments.length / COMMENTS_PER_PAGE));

  // Garante que a página atual está dentro dos limites
  if (currentPage >= totalPages) {
    currentPage = Math.max(0, totalPages - 1);
  }

  // Limpa o container
  $commentsContainer.innerHTML = "";

  if (filteredComments.length === 0) {
    // Exibe mensagem quando não há comentários
    $commentsContainer.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-custom-text-secondary text-lg">Nenhum relato encontrado.</p>
      </div>
    `;
    return;
  }

  // Calcula o range de comentários para a página atual
  const startIndex = currentPage * COMMENTS_PER_PAGE;
  const endIndex = Math.min(startIndex + COMMENTS_PER_PAGE, filteredComments.length);
  const pageComments = filteredComments.slice(startIndex, endIndex);

  pageComments.forEach((comment, index) => {
    const commentCard = document.createElement("article");
    commentCard.className = "mt-6 bg-custom-surface border border-custom-card-border shadow-sm p-6 rounded-lg hover:shadow-md transition-shadow duration-200 h-[350px] overflow-y-auto";

    const globalIndex = startIndex + index + 1;
    const totalComments = filteredComments.length;

    commentCard.innerHTML = `
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-lg font-semibold text-custom-text">Relato #${globalIndex}</h3>
        <span class="text-xs text-custom-text-secondary bg-custom-secondary px-2 py-1 rounded">
          ${globalIndex} de ${totalComments}
        </span>
      </div>
      <div class="text-custom-text leading-relaxed text-sm">
        ${comment}
      </div>
    `;

    // Adiciona diretamente ao container principal
    $commentsContainer.appendChild(commentCard);
  });

  // Adiciona controles de paginação se houver mais de uma página
  if (totalPages > 1) {
    const paginationControls = createPaginationControls(totalPages);
    paginationControls.className += " col-span-full"; // Ocupa toda a largura do grid
    $commentsContainer.appendChild(paginationControls);
  }
};

const createPaginationControls = (totalPages) => {
  const controls = document.createElement("div");
  controls.className = "flex flex-col sm:flex-row items-center justify-between bg-custom-surface border border-custom-card-border rounded-lg p-4 gap-4 mt-8";

  // Info da página
  const pageInfo = document.createElement("div");
  pageInfo.className = "text-sm text-custom-text-secondary";
  const startItem = (currentPage * COMMENTS_PER_PAGE) + 1;
  const endItem = Math.min((currentPage + 1) * COMMENTS_PER_PAGE, filteredComments.length);
  pageInfo.textContent = `Mostrando ${startItem}-${endItem} de ${filteredComments.length} relatos`;

  // Container dos controles de navegação
  const navControls = document.createElement("div");
  navControls.className = "flex items-center space-x-2";

  // Botão anterior
  const prevButton = document.createElement("button");
  prevButton.className = ` font-bold px-4 py-2 text-black transition-all duration-150 flex items-center ${currentPage === 0
    ? 'cursor-not-allowed'
    : ''
    }`;
  prevButton.innerHTML = `
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
    Ant.
  `;
  prevButton.disabled = currentPage === 0;
  prevButton.onclick = () => {
    if (currentPage > 0) {
      currentPage--;
      renderCurrentPage();
    }
  };

  // Navegação por números de página
  const pageNumbers = document.createElement("div");
  pageNumbers.className = "flex space-x-1";

  const startPage = Math.max(0, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  // Primeira página se não estiver no range
  if (startPage > 0) {
    const firstPageButton = createPageButton(0, "1");
    pageNumbers.appendChild(firstPageButton);
    if (startPage > 1) {
      const ellipsis = document.createElement("span");
      ellipsis.className = "px-2 py-1 text-black";
      ellipsis.textContent = "...";
      pageNumbers.appendChild(ellipsis);
    }
  }

  // Páginas no range atual
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = createPageButton(i, (i + 1).toString());
    pageNumbers.appendChild(pageButton);
  }

  // Última página se não estiver no range
  if (endPage < totalPages - 1) {
    if (endPage < totalPages - 2) {
      const ellipsis = document.createElement("span");
      ellipsis.className = "px-2 py-1 text-black";
      ellipsis.textContent = "...";
      pageNumbers.appendChild(ellipsis);
    }
    const lastPageButton = createPageButton(totalPages - 1, totalPages.toString());
    pageNumbers.appendChild(lastPageButton);
  }

  // Botão próximo
  const nextButton = document.createElement("button");
  nextButton.className = `font-bold px-4 py-2 text-black transition-all duration-150 flex items-center ${currentPage >= totalPages - 1
    ? 'cursor-not-allowed'
    : ''
    }`;
  nextButton.innerHTML = `
    Prox.
    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  `;
  nextButton.disabled = currentPage >= totalPages - 1;
  nextButton.onclick = () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      renderCurrentPage();
    }
  };

  navControls.appendChild(prevButton);
  navControls.appendChild(pageNumbers);
  navControls.appendChild(nextButton);

  controls.appendChild(pageInfo);
  controls.appendChild(navControls);

  return controls;
};

const createPageButton = (pageIndex, label) => {
  const pageButton = document.createElement("button");
  pageButton.className = `w-8 h-8 rounded-md text-black text-sm transition-all duration-150 ${pageIndex === currentPage
    ? 'bg-custom-primary '
    : 'bg-custom-secondary hover:bg-custom-secondary-hover'
    }`;
  pageButton.textContent = label;
  pageButton.onclick = () => {
    currentPage = pageIndex;
    renderCurrentPage();
  };
  return pageButton;
};

export const applySearchFilter = () => {
  const $searchInput = document.getElementById("searchInput");
  if (!$searchInput) return;

  const term = ($searchInput.value || "").toLowerCase();

  // Filtra comentários baseado no termo de busca
  if (term === "") {
    filteredComments = [...allComments];
  } else {
    filteredComments = allComments.filter(comment =>
      comment.toLowerCase().includes(term)
    );
  }

  // Reseta para primeira página após filtrar
  currentPage = 0;
  renderCurrentPage();
};
