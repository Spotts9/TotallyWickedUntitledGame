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

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
  this.load.image("mountains", mountains);
  this.load.image("sky", skyClouds);
  this.load.image("diamond", diamond);
  this.load.image("spike", spike);
  this.load.image("platform500", platform500);
  this.load.image("platform200", platform200);

  this.load.spritesheet("dude", dudeImg, { frameWidth: 32, frameHeight: 48 });
}

function create() {
  //background
  let bg = this.add.image(0, 0, "mountains").setOrigin(0, 0);
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 570, "platform500").setScale(5).refreshBody();

  this.cameras.main.setBounds(0, 0, 5000, bg.displayHeight);

  player = this.physics.add.sprite(25, 400, "dude");
  player.setBounce(0.2);

  // player.setCollideWorldBounds(true);
  
  this.physics.add.collider(player, platforms);
  this.cameras.main.startFollow(player);

  cursors = this.input.keyboard.createCursorKeys();

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

  // this.physics.add.collider(diamonds, platforms);
}

function update() {
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
