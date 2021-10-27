var Level = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function Level ()
    {
        Phaser.Scene.call(this, { key: 'level' });
    },

    init: function (){
        cursors = this.input.keyboard.createCursorKeys();
        jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    },

    preload: function (){},

    create: function (){
        this.player = this.physics.add.sprite(this.cameras.main.width / 2, 0, 'player');
        this.physics.world.setBounds(0, 0, 1000, 300);
        this.cameras.main.setBounds(0, 0, 400, 300);

        this.player.setCollideWorldBounds(true);

        let platform = this.physics.add.staticGroup();
        platform.create(this.cameras.main.width / 2, 300, "ground");
        this.physics.add.collider(this.player, platform);
    },

    update: function (){
        if(cursors.left.isDown){
            this.player.body.velocity.x = -50;
        }
        if(cursors.right.isDown){
            this.player.body.velocity.x = 50;
        }
        if(jumpButton.isDown){
            this.player.body.velocity.y = -50;
        }
    },
});
