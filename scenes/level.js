var Level = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function Level() {
        Phaser.Scene.call(this, {key: 'level'});
    },

    init: function () {
        cursors = this.input.keyboard.createCursorKeys();
        shootButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        jumpTimer = null;
    },

    preload: function () {
    },

    create: function () {
        const mainCamera = this.cameras.main;

        this.player = this.physics.add.sprite(mainCamera.width / 2, 0, 'player');
        this.bonus = this.physics.add.sprite(600, 0, 'armor');
        this.physics.world.setBounds(0, 0, 1000, 300);
        mainCamera.startFollow(this.player);
        mainCamera.setBounds(0, 0, 1000, 300);

        this.player.setCollideWorldBounds(true);

        let platform = this.physics.add.staticGroup();
        platform.create(mainCamera.width / 2, 300, "ground")
        this.physics.add.collider(this.player, platform);
        this.physics.add.collider(this.bonus, platform);

        // one-way platform
        let oneWayPlatforms = this.physics.add.staticGroup();
        oneWayPlatforms.create(mainCamera.width * .75, 250, "platform");

        oneWayPlatformCollider = this.physics.add.collider(this.player, oneWayPlatforms);

        this.shootSprites = [];

        // bomb_explode
        this.bombExplodeSprite = this.physics.add.sprite(-100, -100, "bomb_explode");
        this.bombExplodeSprite.body.enable = false;

        // bomb_intact
        this.bombIntactSprite = this.physics.add.sprite(400, 0, "bomb_sprite");
        this.physics.add.collider(this.bombIntactSprite, platform);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('bomb_sprite', { frames: [0]}),
            frameRate: 16,
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('bomb_sprite', { frames: [1, 2]}),
            frameRate: 16,
        });
    },

    update: function () {
        if (shootButton.isDown && !this.shootSprites.length) {
            this.reload();
        }

        if (shootButton.isUp && !!this.shootSprites.length) {
            this.shoot();
        }

        if (cursors.left.isDown) {
            this.player.body.velocity.x = -50;
        }
        if (cursors.right.isDown) {
            this.player.body.velocity.x = 50;
        }
        if (cursors.up.isDown && this.player.body.onFloor() && this.time.now > jumpTimer) {
            this.player.body.velocity.y = -150 * 2;
            jumpTimer = this.time.now + 750;
        }
        if (cursors.left.isUp && cursors.right.isUp) {
            this.player.body.velocity.x = 0;
        }

        oneWayPlatformCollider.active = this.player.body.velocity.y >= 0;
    },

    reload: function () {
        const shootSprite = this.physics.add.sprite(-10, -10, "shoot");
        shootSprite.body.setAllowGravity(false);
        shootDir = 1;

        shootSprite.body.enable = true;

        shootSprite.body.x = this.player.body.x + 20;
        shootSprite.body.y = this.player.body.y + 2;

        this.physics.add.collider(shootSprite, this.bombIntactSprite, function (sprite1, sprite2) {
            sprite1.body.velocity.x = 0;
            sprite2.body.velocity.x = 0;

            sprite1.destroy();
            if (sprite2) {
                sprite2.play('explode', true);
            }

            setTimeout(() => sprite2.destroy(), 500);
        });

        this.shootSprites.push(shootSprite);
    },

    shoot: function () {
        shootDir = this.player.body.velocity.x >= 0 ? 1 : -1;
        const shoot = this.shootSprites.pop();
        shoot.body.velocity.x = 100 * shootDir;
    },
});
