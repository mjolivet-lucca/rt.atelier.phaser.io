var Level = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function Level ()
    {
        Phaser.Scene.call(this, { key: 'level' });
    },

    init: function (){},

    preload: function (){},

    create: function (){

        this.add
            .text(this.cameras.main.width - 50, 15, `Phaser v${Phaser.VERSION}`, {
                color: '#ffffff',
                fontSize: '24px'
            })
            .setOrigin(1, 0)
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'phaser-logo');
    },

    update: function (){},
});
