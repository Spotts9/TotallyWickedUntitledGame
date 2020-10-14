import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import dudeImg from "./assets/images/dude.png";
import mountains from "./assets/images/mountain-skyline.png";
import skyClouds from "./assets/images/sky-clouds.jpg";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 300},
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
  this.load.image("mountains", mountains);
  this.load.image("sky", skyClouds);

  this.load.spritesheet("dude", dudeImg, 
    {frameWidth: 32, frameHeight:48});
}

function create() {
  //background
  this.add.image(0, 0, 'mountains').setOrigin(0,0);


    this.player=this.physics.add.sprite(25,550,"dude");
    this.player.setBounce(0.2);

    this.player.setCollideWorldBounds(true);

this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers("dude", {start:0, end:3}),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [{key: "dude", frame: 4}],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers("dude", {start:5, end:8}),
    frameRate: 10,
    repeat: -1
});
}

function update(){

}
