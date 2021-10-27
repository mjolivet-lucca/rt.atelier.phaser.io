var Prepare = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function Prepare ()
    {
        Phaser.Scene.call(this, 'prepare');
    },

    preload: function(){
        this.load.image('phaser-logo', 'assets/phaser-logo.png');
        this.load.image('player', 'assets/perso.png');
        this.load.image('ground', 'assets/plateforme.png');
    },

    create: function ()
    {
        this.scene.start('level');
    }
});
