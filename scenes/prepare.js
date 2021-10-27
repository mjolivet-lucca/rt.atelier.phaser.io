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
        this.load.image('bomb_explode', 'assets/bomb_explode.png');
        this.load.image('bomb_intact', 'assets/bomb_intact.png');
        this.load.spritesheet('bomb_sprite', 'assets/bomb_sprite.png', { frameWidth: 32, frameHeight: 32 });
    },

    create: function ()
    {
        this.scene.start('level');
    }
});
