import Quadro from './scripts/Column.js';

export function closeAllDropdowns() {
    const openedMenus = document.querySelectorAll('.coluna .opcoes');
    openedMenus.forEach(menu => {
        const parentLi = menu.closest('li');
        parentLi.classList.remove('show');
    });
}

export function getNewPosition(coluna, posY) {
    const cards = coluna.querySelectorAll(".item:not(.dragging)");
    let result = null;
    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;
        if (posY >= boxCenterY) result = refer_card;
    }
    return result;
}
//inicializa listeners de drag and drop
function initializeDragAndDrop() {

    const $colunas = document.querySelectorAll(".lista");

    //drag
    document.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("item")) {
            e.target.classList.add("dragging");
        }
    });
    //drop
    document.addEventListener("dragend", (e) => {
        if (e.target.classList.contains("item")) {
            e.target.classList.remove("dragging");
        }
    });
    //define a posição em que o card deve ser colocado a depender da posição
    /*-----------REMOVER APOS BACKEND------------
    $colunas.forEach((coluna) => {
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
    });*/

}
//inicializa listeners para o funcionamento dos menus Dropdown
function initializeDropdowns() {
    const $menuOpcoes = document.querySelectorAll('.opcoes a');

    //garante que os menus não ficarão abertos desnecessariamente
    document.addEventListener("mousedown", () => {
        closeAllDropdowns();
    });

    // Inicializar event listeners para o menu de opções existente
    /*-----------REMOVER APOS BACKEND------------
    $menuOpcoes.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllDropdowns();
            const parentLi = toggle.closest('li');
            parentLi.classList.toggle('show');
        });
    });*/
    // Adicionar event listener para fechar o menu de opções ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.opcoes')) {
            closeAllDropdowns();
        }
    });
}

//inicializa o dashboard
function initializeDashboard() {
    const $botaoCriar = document.getElementById('coluna');

    $botaoCriar.addEventListener('click', () => {
        let titulo = prompt("Digite o nome da coluna: ");
        if (titulo) {
            new Quadro().createColumn(titulo);
        }
    });
}

//inicializa todos os listeners necessários
function initialize() {
    Quadro.carregarColunas();
    initializeDashboard();
    initializeDropdowns();
    initializeDragAndDrop();
};

initialize();