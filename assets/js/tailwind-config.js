// tailwind-config.js - Configuração do Tailwind com cores customizadas

// Configuração do Tailwind com cores customizadas
const tailwindConfig = {
    theme: {
        extend: {
            colors: {
                // Cores do tema claro
                'custom-bg': 'ffffff',
                'custom-navbar-bg': '#ffc107',
                'custom-surface': '#f8fafc',
                'custom-text': '#0d1017',
                'custom-text-secondary': 'rgba(30, 41, 59, 0.7)',
                'custom-primary': '#ffc107',
                'custom-primary-hover': '#e8b210',
                'custom-primary-active': '#f7be14',
                'custom-secondary': 'rgba(148, 163, 184, 0.1)',
                'custom-secondary-hover': 'rgba(148, 163, 184, 0.2)',
                'custom-border': 'rgba(148, 163, 184, 0.3)',
                'custom-card-border': 'rgba(148, 163, 184, 0.2)',
                'custom-error': '#ef4444',
                'custom-success': '#10b981',
                'custom-warning': '#f59e0b',
                'custom-info': '#6b7280',
            }
        }
    }
};

// Função para aplicar a configuração
function applyTailwindConfig() {
    if (typeof tailwind !== 'undefined') {
        tailwind.config = tailwindConfig;
    }
}

// Aplicar configuração imediatamente se possível
applyTailwindConfig();

// Aplicar configuração quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', applyTailwindConfig);

// Aplicar configuração quando a janela estiver carregada
window.addEventListener('load', applyTailwindConfig); 