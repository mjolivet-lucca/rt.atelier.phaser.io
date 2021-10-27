var Prepare = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function Prepare ()
    {
        Phaser.Scene.call(this, 'prepare');
    },

    preload: function(){
        this.load.image('player', 'assets/lucca.png');
        this.load.image('ground', 'assets/sol.png');
        this.load.image('platform', 'assets/plateforme.png');
        this.load.image('armor', 'assets/Armor_Bonus.png');
        this.load.image('shoot', 'assets/tir.png');
    },

    create: function ()
    {
        this.scene.start('level');
    }
});
