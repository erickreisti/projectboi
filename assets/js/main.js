// ===== CARDÁPIO INTERATIVO - BOI DE OURO =====

class Cardapio {
  constructor() {
    this.menuItems = document.querySelectorAll(".menu-item");
    this.filterButtons = document.querySelectorAll(".menu-filter-btn");
    this.verCardapioBtn = document.querySelector(".btn-ver-cardapio");
    this.currentFilter = "all";

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupMenuItems();
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

    // Event listener para busca (opcional)
    this.setupSearch();
  }

  setupMenuItems() {
    // Adiciona animação de entrada para os itens
    this.menuItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add("animate-in");
    });
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
    this.menuItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      const isVisible = filter === "all" || category === filter;

      if (isVisible) {
        this.showItem(item);
      } else {
        this.hideItem(item);
      }
    });

    // Animação de reorganização
    setTimeout(() => {
      this.reorganizeGrid();
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
    const container = document.querySelector("#menu .row");
    const visibleItems = Array.from(this.menuItems).filter(
      (item) => item.style.display !== "none"
    );

    // Limpa o container
    container.innerHTML = "";

    // Reinsere os itens visíveis
    visibleItems.forEach((item) => {
      container.appendChild(item);
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

  setupSearch() {
    // Funcionalidade de busca (opcional)
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Buscar no cardápio...";
    searchInput.className = "menu-search form-control mb-4";
    searchInput.style.maxWidth = "300px";
    searchInput.style.margin = "0 auto";
    searchInput.style.display = "block";

    const filtersContainer = document.querySelector(".menu-filters");
    if (filtersContainer) {
      filtersContainer.parentNode.insertBefore(searchInput, filtersContainer);

      searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value);
      });
    }
  }

  handleSearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();

    this.menuItems.forEach((item) => {
      const title = item
        .querySelector(".menu-item-title")
        .textContent.toLowerCase();
      const description = item
        .querySelector(".menu-item-description")
        .textContent.toLowerCase();
      const tags = Array.from(item.querySelectorAll(".tag")).map((tag) =>
        tag.textContent.toLowerCase()
      );

      const matches =
        title.includes(term) ||
        description.includes(term) ||
        tags.some((tag) => tag.includes(term));

      if (matches || term === "") {
        this.showItem(item);
      } else {
        this.hideItem(item);
      }
    });
  }
}

// ===== INICIALIZAÇÃO =====

document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o cardápio
  new Cardapio();

  // Adiciona mais itens de exemplo ao cardápio
  addMoreMenuItems();
});

// ===== ITENS ADICIONAIS DO CARDÁPIO =====

function addMoreMenuItems() {
  const menuContainer = document.querySelector("#menu .row");
  if (!menuContainer) return;

  const additionalItems = [
    {
      category: "executivos",
      image: "./assets/images/item_4.jpg",
      title: "Executivo Boi de Ouro",
      description: "Arroz, feijão, farofa, vinagrete e carne do dia",
      price: "R$ 32,90",
      badge: "badge-success",
      tags: ["#Executivo", "#Completo"],
    },
    {
      category: "executivos",
      image: "./assets/images/item_5.jpg",
      title: "Executivo Filé Mignon",
      description: "Arroz, feijão, batata frita e filé mignon",
      price: "R$ 45,90",
      badge: "badge-warning",
      tags: ["#Executivo", "#Premium"],
    },
    {
      category: "combos",
      image: "./assets/images/item_6.jpg",
      title: "Combo Casal",
      description: "2 Picanhas + 2 acompanhamentos + bebida",
      price: "R$ 129,90",
      badge: "badge-primary",
      tags: ["#Combo", "#Romântico"],
    },
    {
      category: "combos",
      image: "./assets/images/item_7.jpg",
      title: "Combo Família",
      description: "4 Picanhas + 4 acompanhamentos + bebidas",
      price: "R$ 199,90",
      badge: "badge-primary",
      tags: ["#Combo", "#Família"],
    },
    {
      category: "carnes",
      image: "./assets/images/item_8.jpg",
      title: "Alcatra com Queijo",
      description: "Alcatra suculenta com queijo coalho gratinado",
      price: "R$ 72,90",
      badge: "",
      tags: ["#Carne", "#Queijo"],
    },
    {
      category: "carnes",
      image: "./assets/images/item_1.jpg",
      title: "Maminha na Manteiga",
      description: "Maminha dourada na manteiga com ervas finas",
      price: "R$ 68,90",
      badge: "badge-success",
      tags: ["#Carne", "#Tradicional"],
    },
  ];

  additionalItems.forEach((item, index) => {
    const menuItem = createMenuItem(item, index + 3);
    menuContainer.appendChild(menuItem);
  });
}

function createMenuItem(itemData, delayIndex) {
  const col = document.createElement("div");
  col.className = "col-lg-4 col-md-6";
  col.setAttribute("data-aos", "fade-up");
  col.setAttribute("data-aos-delay", (delayIndex * 100).toString());
  col.setAttribute("data-category", itemData.category);

  col.innerHTML = `
        <div class="menu-item">
            ${
              itemData.badge
                ? `<div class="menu-item-badge ${
                    itemData.badge
                  }">${getBadgeText(itemData.badge)}</div>`
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

function getBadgeText(badgeClass) {
  const badgeTexts = {
    "badge-primary": "Mais Pedido",
    "badge-success": "Tradicional",
    "badge-warning": "Premium",
  };
  return badgeTexts[badgeClass] || "Destaque";
}
