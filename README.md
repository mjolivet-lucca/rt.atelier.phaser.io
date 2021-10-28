# Atelier RT Phaser.io (27 octobre 2021)

## Résultat de l'atelier
![resultat_atelier_rt](https://user-images.githubusercontent.com/76952659/139223438-78b04051-5586-4c94-993a-dceae2d65132.gif)

-----
## Installations préalables
 * `npm install -g http-server` => permet d'avoir un server http simple
 * "Tiled" : https://www.mapeditor.org/ => utilitaire de création de map
## Ressources
 * Download de phaser.io : https://phaser.io/download/stable
 * exemples officiels phaser 3 : https://phaser.io/examples/v3
 * doc d'API de phaser 3 : https://photonstorm.github.io/phaser3-docs/
 * Notes of Phaser3 : https://rexrainbow.github.io/phaser3-rex-notes/docs/site/
 * tuto sur tiled : https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
## commandes utiles
### Charger une image en cache
```javascript
this.load.image('image_id', 'assets/image_name.jpg');
```

### Charger une spritesheet
```javascript
// 37x45 est la taille de chaque frame
// Dans le deuxième exemple il y a 18 frames dans le PNG.
// On peut omettre ce paramètre si les frames remplissent tout le png

game.load.spritesheet('personnage', 'assets/personnage.png', 37, 45);
game.load.spritesheet('uniqueKey', 'assets/personnage2.png', 37, 45, 18);
```
### Utiliser une image chargée
```javascript
let myImage = this.add.image(0, 0, 'image_id');
```

les deux premiers paramètres correspondent aux coordonnées de placement de l'image (x et y)

### Utiliser une image en temps que sprite
```javascript
player = this.physics.add.sprite(300, 300, 'image_id');
```

### Charger du son
```javascript
preload()
{
    this.load.audio('son1', 'assets/sound.ogg');
}
create()
{
    this.sound.add('son1');
}

[...]
this.sound.play('son1');

```

### Changer l'échelle d'une image
```javascript
player.setScale(0.4);
```

### Récupération des inputs du clavier
```javascript
create()
{
    cursors = this.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

update()
{
    if (cursors.left.isDown){}
    if (jumpButton.isDown){}
}
```

### Gestion de la taille du niveau, de la caméra et du scrolling
```javascript
// on défini la taille de base du niveau et de la caméra dès la config
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    ...
};

create()
{
    // on agrandit la taille du niveau
    this.physics.world.setBounds(0, 0, 2000, 600);
    // la caméra suit le joueur
    this.cameras.main.startFollow(player);
    // on définit des limites à la caméra 
    // pour qu'elle n'affiche pas de choses en dehors du niveau
    this.cameras.main.setBounds(0, 0, 2000, 600);
}

```

### gestion de la collision d'un sprite avec le sol et de sa physique
```javascript
create()
{
    game.physics.enable(player, Phaser.Physics.ARCADE);
    
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
}

update()
{
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }
}
```
### gestion de groupes de plateformes et sol
```javascript
create()
{
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 588, "ground");
    platforms.create(600, 450, "island");
    platforms.create(50, 250, "island");
    platforms.create(650, 220, "island");
    this.physics.add.collider(player, platforms);
}
```


### gestion de la collision entre 2 sprites
```javascript
create()
{
    // "collider" implique un contact "dur" (avec rebond par exemple) 
    this.physics.add.collider(sprite1, sprite2, function (sprite1, sprite2) {
        if (!isGameOver) {
            sprite1.play("explode");
            sprite1.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
                sprite1.destroy();
            });
            isGameOver = true;
        }
    });
    
    // autre possibilité (overlap implique qu'on passe à travers): 
    this.physics.add.overlap(
        sprite1,
        sprite2,
        (player, star) => {
            sprite2.disableBody(true, true)
        },
        null,
        this
    );
}
```


### gestion des animations d'un sprite
```javascript
create()
{
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}

update()
{
    player.animations.play('left');
    player.animations.play('right');
    player.animation.stop();
}
```


### mise en place d'une tilemap
```javascript
function preload() {
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    // tiles in spritesheet 
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
    // simple coin image
    this.load.image('coin', 'assets/coinGold.png');
    // player animations
    this.load.atlas('player', 'assets/player.png', 'assets/player.json');
}

create()
{
    // load the map 
    map = this.make.tilemap({key: 'map'});

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);
    // coin image used as tileset
    var coinTiles = map.addTilesetImage('coin');
    // add coins as tiles
    coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);
    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;
    // player will collide with the level tiles 
    this.physics.add.collider(groundLayer, player);
    // when the player overlaps with a tile with index 17, collectCoin 
    // will be called
    coinLayer.setTileIndexCallback(17, collectCoin, this);
    this.physics.add.overlap(player, coinLayer);
    
    
}
function collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    return false;
}
```
