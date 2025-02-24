var config = { 
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var peixinho;
var tartaruga;

function clamp(_Value, _MaxValue, _MinValue) {
    if(_Value < _MinValue) {
        return _MinValue;
    }
    if(_Value > _MaxValue) {
        return _MaxValue;
    }

    else return _Value;
}

function wrap(_Value, _MaxValue, _MinValue) {
    if(_Value < _MinValue) {
        return _MaxValue;
    }
    if(_Value > _MaxValue) {
        return _MinValue;
    }

    else return _Value;
}
function preload() {
    this.load.image('mar', 'assets/bg_azul-escuro.png');
    this.load.image('peixe', 'assets/peixes/crustaceo.png');
    this.load.image('logo', 'assets/logo-inteli_branco.png');
    this.load.image('tartaruga','assets/peixes/tartaruga.png');
}
function create() {
    this.add.image(400,300, 'mar');
    this.add.image(400,525,'logo').setScale(0.5);

    peixinho = this.add.image(400,300,'peixe');
    tartaruga = this.add.image(0,0,'tartaruga');
    tartaruga.setScale(0.5);

    tartaruga.setFlip(true,false);
    peixinho.setFlip(true,false);

}

function update() {
    peixinho.x = this.input.x;
    peixinho.y = this.input.y;

    
    tartaruga.x+= 2;
    tartaruga.y+= 2;
    tartaruga.x = wrap(tartaruga.x,800,0);
    tartaruga.y = wrap(tartaruga.y,600,0);
    
}

