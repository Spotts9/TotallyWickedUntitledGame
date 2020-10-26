import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import dudeImg from "./assets/images/dude.png";
import mountains from "./assets/images/mountain-skyline.png";
import skyClouds from "./assets/images/sky-clouds.jpg";
import coin from "./assets/images/coin.png";
import diamond from "./assets/images/diamond.png";
import spike from "./assets/images/spike.png";
import platform500 from "./assets/images/platform-500w.png";
import platform200 from "./assets/images/platform-200w.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 2000,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
var cursors;
var player;
var diamonds;
var platforms;
var coins;
var bg;

const game = new Phaser.Game(config);
var score=0;
var scoreText;

function preload() {
  this.load.image("logo", logoImg);
  this.load.image("mountains", mountains);
  this.load.image("sky", skyClouds);
  this.load.image("diamond", diamond);
  this.load.image("spike", spike);
  this.load.image("platform500", platform500);
  this.load.image("platform200", platform200);

  this.load.spritesheet("dude", dudeImg, { frameWidth: 32, frameHeight: 48 });
  this.load.spritesheet("coin",coin,{frameWidth:32,frameHeight:32});
}

function create() {
  //background
  this.bg = this.add.tileSprite(0, 0, 1000,600,"mountains").setOrigin(0).setScrollFactor(0,1);
  platforms = this.physics.add.staticGroup();
  platforms.create(500, 575, "platform500").setScale(2).refreshBody();
platforms.create(1500, 575, "platform500").setScale(2).refreshBody();
platforms.create(2500, 575, "platform500").setScale(2).refreshBody();
platforms.create(3500, 575, "platform500").setScale(2).refreshBody();
platforms.create(4500, 575, "platform500").setScale(2).refreshBody();

  this.cameras.main.setBounds(0, 0, 5000, 600);

  player = this.physics.add.sprite(25, 400, "dude");
  player.setBounce(0.2);

  // player.setCollideWorldBounds(true);
  
  this.physics.add.collider(player, platforms);
  this.cameras.main.startFollow(player);

  cursors = this.input.keyboard.createCursorKeys();

  coins = this.physics.add.group({
      key: "coin",
      repeat: 10,
      setXY: {x: 200, y: 350, stepX: 200},
  });

  this.anims.create({
      key: "spin",
      frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
  });

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  // this.diamonds = this.physics.add.group({
  //   key: "diamond",
  //   repeat: 10,
  //   setXY: { x: 15, y: 0, stepX: 80 },
  // });
  // this.diamonds.children.iterate(function (child) {
  //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  // });
scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#FF0000"
});
  this.physics.add.collider(coins, platforms);
  this.physics.add.overlap(player,coins,collectcoin,null,this);
}

function collectcoin(player,coin){
    coin.disableBody(true,true);
    score +=10;
    scoreText.setText("Score: " + score);
}
function update() {
    this.bg.setTilePosition(this.cameras.main.scrollX);
    scoreText.x=(this.cameras.main.scrollX);
    Phaser.Actions.Call(coins.getChildren(), (child) => {
        child.anims.play("spin",true);
    });

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }
  if (
    (cursors.up.isDown || cursors.space.isDown) &&
    player.body.onFloor()
  ) {
    player.setVelocityY(-330);
  }
}
