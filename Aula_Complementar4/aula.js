import { unwatchFile } from "fs";

/*
var Frutas = Object.freeze({
    Banana : 0, 
    Pera : 1,
    Uva: 2
});
const estoque ={
    Banana: 10,
    Pera: 4,
    Uva:3,
    length:4
}

function venderFruta(fruta, quantidade){
    switch(fruta){
        case Frutas.Banana:
            if(estoque.Banana >= quantidade){
                estoque.Banana -= quantidade;
                console.log("Venda realizada");
            } else {console.log("Não há estoque!");}
        break;
        case Frutas.Pera:
            if(estoque.Pera >= quantidade){
                estoque.Pera -= quantidade;
                console.log("Venda realizada");
            } else {console.log("Não há estoque!");}
        break;
        case Frutas.Uva:
            if(estoque.Uva >= quantidade){
                estoque.Uva -= quantidade;
                console.log("Venda realizada");
            } else {console.log("Não há estoque!");}
        break;
        default:
            console.log("Fruta não encontrada");
        break;
    }
}
console.log(estoque);
for(let i = 0; i < estoque.length-1; i++){
    venderFruta(i, getRandomInt(1,3));
}
console.log(estoque);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

*/
var Frutas = Object.freeze({
    Banana : 0, 
    Pera : 1,
    Uva: 2,
    Laranja: 3,
    length: 4
});
//acessado como estoque[fruta] -> [quantidade, preco]
const estoque = [[10,2],
                 [4, 4],
                 [14,5],
                 [5, 4]];

function comprarFruta(fruta, qtd, pagamento){
    if(estoque[fruta][0] >= qtd){
        if(estoque[fruta][1]*qtd <= pagamento){
            let total = estoque[fruta][1]*qtd;
            estoque[fruta][0] -= qtd;
            let troco = pagamento - estoque[fruta][1]*qtd;
            console.log(`${qtd} de ${fruta} comprados por ${total}. Troco de $${troco}`)
        }
    }
}

comprarFruta(Frutas.Banana, 3, 10);

