var Level = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function Level ()
    {
        Phaser.Scene.call(this, { key: 'level' });
    },

    init: function (){
        this.player = null;
    },

    preload: function (){},

    create: function (){
        this.player = this.physics.add.sprite(this.cameras.main.width / 2, 0, 'player');
        this.physics.world.setBounds(0, 0, 2000, 600);
        this.cameras.main.setBounds(0, 0, 800, 600);

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        let platform = this.physics.add.staticGroup();
        platform.create(this.cameras.main.width / 2, 600, "ground");
        this.physics.add.collider(this.player, platform);
    },

    update: function (){},
});
