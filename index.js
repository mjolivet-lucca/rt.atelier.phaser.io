var config = {
  width: 400,
  height: 300,
  type: Phaser.CANVAS,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  },
  parent: 'game',
  scene: [ Prepare, Level ],
  scale: {
    zoom: 2
  }
}

var game = new Phaser.Game(config);
