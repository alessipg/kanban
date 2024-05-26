import Quadro from './Quadro.js';

function criarQuadro(titulo) {
    const quadro = new Quadro(titulo);
    const $kanban = document.querySelector('.kanban');
    const quadroHTML = `
    <div class="quadro">
        <div class="cabecalho">
            <div class="titulo">
                ${titulo}
            </div>
            <ul class="lista">
                <li>
                    <div class="opcoes">
                        <a href="#">
                            ...
                        </a>
                    </div>
                    <ul class="dropdown">
                        <div class="menuDrop">
                            <li><button>Editar</button></li>
                            <li><button>Excluir</button></li>
                        </div>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="coluna">
            <div class="item" draggable="true">
                <div class="conteudo">
                    Item 01
                </div>
                <ul class="opItens">
                    <li>
                        <div class="opcoes">
                            <a href="#">
                                ...
                            </a>
                        </div>
                        <ul class="dropdown">
                            <div class="menuDrop">
                                <li><button>Editar</button></li>
                                <li><button>Excluir</button></li>
                            </div>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="item" draggable="true">
                <div class="conteudo">
                    Item 02
                </div>
                <ul class="opItens">
                    <li>
                        <div class="opcoes">
                            <a href="#">
                                ...
                            </a>
                        </div>
                        <ul class="dropdown">
                            <div class="menuDrop">
                                <li><button>Editar</button></li>
                                <li><button>Excluir</button></li>
                            </div>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `;
    $kanban.insertAdjacentHTML("beforeend", quadroHTML);

    // Adicionar event listeners de drag and drop à nova coluna
    const novaColuna = $kanban.lastElementChild.querySelector(".coluna");
    novaColuna.addEventListener("dragover", (e) => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        if (dragging) {
            const applyAfter = getNewPosition(novaColuna, e.clientY);
            if (applyAfter) {
                applyAfter.insertAdjacentElement("afterend", dragging);
            } else {
                novaColuna.prepend(dragging);
            }
        }
    });

    // Adicionar event listener para o menu de opções nos novos quadros
    const menuOpcoes = $kanban.lastElementChild.querySelectorAll('.opcoes a');
    menuOpcoes.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllDropdowns();
            const parentLi = toggle.closest('li');
            parentLi.classList.toggle('show');
        });
    });
}

function closeAllDropdowns() {
    const openedMenus = document.querySelectorAll('.quadro .opcoes');
    openedMenus.forEach(menu => {
        const parentLi = menu.closest('li');
        parentLi.classList.remove('show');
    });
}

function getNewPosition(coluna, posY) {
    const cards = coluna.querySelectorAll(".item:not(.dragging)");
    let result = null;
    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;
        if (posY >= boxCenterY) result = refer_card;
    }
    return result;
}

document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("item")) {
        e.target.classList.add("dragging");
    }
});

document.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("item")) {
        e.target.classList.remove("dragging");
    }
});
document.addEventListener("mousedown", () => {
        closeAllDropdowns(); 
});

const colunas = document.querySelectorAll(".coluna");
colunas.forEach((coluna) => {
    coluna.addEventListener("dragover", (e) => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        if (dragging) {
            const applyAfter = getNewPosition(coluna, e.clientY);
            if (applyAfter) {
                applyAfter.insertAdjacentElement("afterend", dragging);
            } else {
                coluna.prepend(dragging);
            }
        }
    });
});

const $botaoCriar = document.getElementById('quadro');
$botaoCriar.addEventListener('click', () => {
    let titulo = prompt("Digite o nome do quadro: ");
    if (titulo) {
        criarQuadro(titulo);
    }
});

// Inicializar event listeners para o menu de opções existente
document.addEventListener('DOMContentLoaded', () => {
    const menuOpcoes = document.querySelectorAll('.opcoes a');
    menuOpcoes.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllDropdowns();
            const parentLi = toggle.closest('li');
            parentLi.classList.toggle('show');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.opcoes')) {
            closeAllDropdowns();
        }
    });
});

// Adicionar event listener para fechar o menu de opções ao clicar fora, incluindo os novos menus
document.addEventListener('click', (e) => {
    if (!e.target.closest('.opcoes')) {
        closeAllDropdowns();
    }
});
