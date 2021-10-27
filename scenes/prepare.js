var Prepare = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function Prepare ()
    {
        Phaser.Scene.call(this, 'prepare');
    },

    preload: function(){
        this.load.image('phaser-logo', 'assets/phaser-logo.png');
        this.load.image('player', 'assets/lucca.png');
        this.load.image('ground', 'assets/sol.png');
        this.load.image('armor', 'assets/Armor_Bonus.png');
    },

    create: function ()
    {
        this.scene.start('level');
    }
});
