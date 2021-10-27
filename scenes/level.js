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

        // Shoot
        this.shootSprite = this.physics.add.sprite(-10, -10, "shoot");
        this.shootSprite.body.setAllowGravity(false);
        this.shootSprite.body.enable = false;
        shootDir = 1;
    },

    update: function () {
        if (shootButton.isDown){
            this.shootSprite.body.enable = true;
            this.shootSprite.body.x = this.player.body.x + 20;
            this.shootSprite.body.y = this.player.body.y + 2;
            shootDir = this.player.body.velocity.x >= 0 ? 1 : -1;
        }

        if (this.shootSprite.body.enable) {
            this.shootSprite.body.velocity.x = 100 * shootDir;
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
});
