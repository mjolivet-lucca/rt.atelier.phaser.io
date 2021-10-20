var config = {
  width: window.innerWidth,
  height: window.innerHeight,
  type: Phaser.CANVAS,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  },
  parent: 'game',
  scene: [ Prepare, Level ]
}

var game = new Phaser.Game(config);
