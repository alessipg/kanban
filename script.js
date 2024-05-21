const colunas = document.querySelectorAll(".coluna");

document.addEventListener("dragstart", (e) =>{
    e.target.classList.add("dragging");
})

document.addEventListener("dragend", (e) =>{
    e.target.classList.remove("dragging");
})

colunas.forEach((item) =>{
    item.addEventListener("dragover",(e) =>{
        const dragging = document.querySelector(".dragging");
        const applyAfter = getNewPosition(item, e.clientY);

        if(applyAfter){
            applyAfter.insertAdjacentElement("afterend",dragging);
        }else{
            item.prepend(dragging);
        }
    });
});

function getNewPosition(coluna,posY){
    const cards = coluna.querySelectorAll(".item:not(.dragging)");
    let result;
    for (let refer_card of cards){
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;
        if(posY >= boxCenterY) result = refer_card;
    }
    return result;
}