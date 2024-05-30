import { closeAllDropdowns } from '../main.js';
import { getNewPosition } from '../main.js';

export default class Quadro {
    createColumn(titulo) {
        const $kanban = document.querySelector('.kanban');
        const quadroHTML = `
        <div class="coluna">
            <div class="cabecalho">
                <div class="titulo">
                    ${titulo}
                </div>
                <ul class="opHeader">
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
            <div class="lista">
            </div>
        </div>
        `;
        $kanban.insertAdjacentHTML("beforeend", quadroHTML);

        // Adicionar event listeners de drag and drop à nova coluna
        const novaColuna = $kanban.lastElementChild.querySelector(".lista");
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
    // Busca todas as colunas da API
    static carregarColunas(){
        fetch("http://localhost:8080/coluna")
        .then(response => response.json())
        .then(data =>{
            data.forEach(coluna => {
                new Quadro().createColumn(coluna.title);
            });
        })
        .catch(err => console.error(err));
    }

}

