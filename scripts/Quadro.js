import { closeAllDropdowns } from '../main.js';
import { getNewPosition } from '../main.js';

export default class Quadro {
    constructor(titulo, itens = []) {
        this.titulo = titulo;
        this.itens = itens;
    }
    setTitulo(titulo) { this.titulo = titulo; }
    getTitulo() { return this.titulo; }
    setItens(itens) { this.itens = itens; }
    getItens() { return this.itens; }

    criarQuadro(titulo) {
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

}

