// ===== CARDÁPIO INTERATIVO - BOI DE OURO =====

class CardapioInterativo {
  constructor() {
    this.menuItems = document.querySelectorAll(".menu-item-card");
    this.filterButtons = document.querySelectorAll(".menu-filter-btn");
    this.verCardapioBtn = document.getElementById("btn-ver-cardapio");
    this.menuContainer = document.querySelector(".menu-items-container");
    this.currentFilter = "all";

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.animateItemsOnLoad();
  }

  setupEventListeners() {
    // Event listeners para os botões de filtro
    this.filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.handleFilterClick(e.target);
      });
    });

    // Event listener para o botão "Ver Cardápio Completo"
    if (this.verCardapioBtn) {
      this.verCardapioBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.showAllItems();
      });
    }
  }

  animateItemsOnLoad() {
    // Animação inicial dos itens
    setTimeout(() => {
      this.menuItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 100);
      });
    }, 300);
  }

  handleFilterClick(button) {
    const filter = button.getAttribute("data-filter");

    // Atualiza botão ativo
    this.updateActiveButton(button);

    // Aplica o filtro
    this.filterItems(filter);

    // Atualiza filtro atual
    this.currentFilter = filter;

    // Animação de transição
    this.animateFilterTransition();
  }

  updateActiveButton(activeButton) {
    this.filterButtons.forEach((button) => {
      button.classList.remove("active");
    });
    activeButton.classList.add("active");
  }

  filterItems(filter) {
    // Adiciona classe de loading
    document.getElementById("menu").classList.add("filtering");

    // Timeout para dar tempo da animação de loading aparecer
    setTimeout(() => {
      this.menuItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        const isVisible = filter === "all" || category === filter;

        if (isVisible) {
          this.showItem(item);
        } else {
          this.hideItem(item);
        }
      });

      // Reorganiza o grid após a filtragem
      this.reorganizeGrid();

      // Remove classe de loading
      setTimeout(() => {
        document.getElementById("menu").classList.remove("filtering");
      }, 300);
    }, 300);
  }

  showItem(item) {
    item.style.display = "block";
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 50);
  }

  hideItem(item) {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    setTimeout(() => {
      item.style.display = "none";
    }, 300);
  }

  showAllItems() {
    // Remove filtro ativo
    this.filterButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // Ativa o botão "Todos"
    const allButton = document.querySelector('[data-filter="all"]');
    if (allButton) {
      allButton.classList.add("active");
    }

    // Mostra todos os itens
    this.menuItems.forEach((item) => {
      this.showItem(item);
    });

    // Reorganiza o grid
    setTimeout(() => {
      this.reorganizeGrid();
    }, 300);

    // Scroll suave para o cardápio
    this.smoothScrollToMenu();
  }

  reorganizeGrid() {
    const visibleItems = Array.from(this.menuItems).filter(
      (item) => item.style.display !== "none"
    );

    // Limpa o container
    this.menuContainer.innerHTML = "";

    // Reinsere os itens visíveis com animação
    visibleItems.forEach((item, index) => {
      this.menuContainer.appendChild(item);

      // Aplica animação de entrada
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  animateFilterTransition() {
    const menuSection = document.getElementById("menu");
    menuSection.style.opacity = "0.7";

    setTimeout(() => {
      menuSection.style.opacity = "1";
    }, 300);
  }

  smoothScrollToMenu() {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Método para adicionar novos itens dinamicamente
  adicionarItem(itemData) {
    const menuItem = this.criarMenuItem(itemData);
    this.menuContainer.appendChild(menuItem);
    this.menuItems = document.querySelectorAll(".menu-item-card");
  }

  criarMenuItem(itemData) {
    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6 menu-item-card";
    col.setAttribute("data-category", itemData.category);
    col.style.display = "none";
    col.style.opacity = "0";
    col.style.transform = "translateY(30px)";

    col.innerHTML = `
            <div class="menu-item">
                ${
                  itemData.badge
                    ? `<div class="menu-item-badge ${
                        itemData.badge
                      }">${this.getBadgeText(itemData.badge)}</div>`
                    : ""
                }
                <img src="${itemData.image}" alt="${itemData.title}" />
                <div class="menu-item-content">
                    <h3 class="menu-item-title">${itemData.title}</h3>
                    <p class="menu-item-description">${itemData.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="tags">
                            ${itemData.tags
                              .map((tag) => `<span class="tag">${tag}</span>`)
                              .join("")}
                        </div>
                        <span class="menu-item-price">${itemData.price}</span>
                    </div>
                </div>
            </div>
        `;

    return col;
  }

  getBadgeText(badgeClass) {
    const badgeTexts = {
      "badge-primary": "Mais Pedido",
      "badge-success": "Tradicional",
      "badge-warning": "Premium",
    };
    return badgeTexts[badgeClass] || "Destaque";
  }
}

// ===== INICIALIZAÇÃO =====

document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o cardápio interativo
  const cardapio = new CardapioInterativo();

  // Exemplo de como adicionar novos itens dinamicamente
  const novosItens = [
    {
      category: "carnes",
      image: "./assets/images/item_1.jpg",
      title: "Maminha na Manteiga",
      description: "Maminha dourada na manteiga com ervas finas",
      price: "R$ 68,90",
      badge: "badge-success",
      tags: ["#Carne", "#Tradicional"],
    },
    {
      category: "executivos",
      image: "./assets/images/item_4.jpg",
      title: "Executivo Especial",
      description: "Arroz, feijão, batata frita, salada e filé mignon",
      price: "R$ 49,90",
      badge: "badge-warning",
      tags: ["#Executivo", "#Especial"],
    },
  ];

  // Adiciona os novos itens após 2 segundos (apenas para demonstração)
  setTimeout(() => {
    novosItens.forEach((item) => {
      cardapio.adicionarItem(item);
    });

    // Mostra os novos itens se o filtro atual for compatível
    cardapio.filterItems(cardapio.currentFilter);
  }, 2000);
});

// ===== FUNÇÕES AUXILIARES =====

// Função para buscar itens no cardápio
function buscarNoCardapio(termo) {
  const cardapio = new CardapioInterativo();
  const itens = document.querySelectorAll(".menu-item-card");

  termo = termo.toLowerCase().trim();

  itens.forEach((item) => {
    const titulo = item
      .querySelector(".menu-item-title")
      .textContent.toLowerCase();
    const descricao = item
      .querySelector(".menu-item-description")
      .textContent.toLowerCase();
    const tags = Array.from(item.querySelectorAll(".tag")).map((tag) =>
      tag.textContent.toLowerCase()
    );

    const corresponde =
      titulo.includes(termo) ||
      descricao.includes(termo) ||
      tags.some((tag) => tag.includes(termo));

    if (corresponde || termo === "") {
      item.style.display = "block";
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 50);
    } else {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      setTimeout(() => {
        item.style.display = "none";
      }, 300);
    }
  });
}
