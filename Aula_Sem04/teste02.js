class Carro {
    constructor(marca, modelo,ano, cor, preco) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
        this.preco = preco;
    }
}

class CarroNovo extends Carro {
    constructor(marca, modelo,ano, cor, preco, garantia) {
        super(marca, modelo,ano, cor, preco);
        this.garantia = garantia;
    }

    ofertaEspecial() {
        console.log(`Oferta especial: ${this.marca} ${this.modelo} por apenas ${this.preco - 500} você leva o carro com garantia de ${this.garantia} anos!`);
    }
    descricao(){
        console.log(`Carro ${this.marca} ${this.modelo} ano ${this.ano} cor ${this.cor} por apenas ${this.preco}`);
    }
}

let newCar = new CarroNovo('Fiat', 'Uno', 2021, 'Vermelho', 30000, 2);
newCar.ofertaEspecial();
newCar.descricao();