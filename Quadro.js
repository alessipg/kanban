export default class Quadro {
    constructor(titulo, itens = []){
        this.titulo = titulo;
        this.itens = itens;
    }
    setTitulo(titulo) { this.titulo = titulo; }
    getTitulo() { return this.titulo; }
    setItens(itens) { this.itens = itens; }
    getItens() { return this.itens; }

}

