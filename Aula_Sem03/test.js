/*
function salutations() {
    return "Olá mundo";
}

salutations();

function somar(a, b) {
    return a+b;
}

somar(3,5);

function isEven(num){
    let _res;
    if(_num % 2 === 0){
        _res = true;
    } else if(num % 2 !== 0){
        _res = false;
    } else {
        _res = NaN;
    }
    return _res;
}

isEven(2);
isEven("Teste");

function fullName(...theArgs){
    let fullName = '';
    for (const arg of theArgs){
        let curarg = arg
        let addition = '${curarg}'
        fullName+=" " + addition;
    }
    return fullName;
}

fullName("Teste","teste01");

*/
var precoMaca = 3;
var descontoMaca = .15;
var precoBanana = 1.5;
var descontoBanana = .20;
var precoPera = 2.4;
var descontoPera = .3;
var precoLaranja = 5;
var descontoLaranja = .3;
var tabelaGUI = [];
var tabelaDescontos= [];
const tabelaCompras = [
    1,
    3,
    5,
    4
];
const tabelaPrecosDescontos = [
    [precoMaca,descontoMaca],
    [precoBanana,descontoBanana],
    [precoPera,descontoPera],
    [precoLaranja,descontoLaranja]
];
function calcularDesconto(preco, desconto){
    return preco*(1-desconto);
}

function getDiscountTable(_table){
    var _newTable = [];
    for(var i = 0; i < _table.length; i++){
        _newTable[i] = calcularDesconto(_table[i][0],_table[i][1]).toFixed(2);
    }
    return _newTable;
}

tabelaDescontos = getDiscountTable(tabelaPrecosDescontos);
function getFinalTable(_tblPD,_tblD,_tblQt){
    let ret = "";
    
    for(var i = 0; i < _tblPD.length; i++){
        
        let _precoOri = _tblPD[i][0];
        let _descontoT = _tblPD[i][1];
        let _descontoF = _descontoT*10;
        let _novoPreco = Number(_tblD[i]).toFixed(2);
        let _qtd = _tblQt[i];
        let _totalProd = _novoPreco*_qtd;
        let newString = `RS:${_precoOri} x ${_descontoF}%= ${_novoPreco} x ${_qtd} = RS:${_totalProd}`;
        ret += newString;
        ret + "\n";
    }

    return ret;
}

getFinalTable(tabelaPrecosDescontos,tabelaDescontos,tabelaCompras);



