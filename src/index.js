import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import dudeImg from "./assets/images/dude.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
  this.load.image("dude", dudeImg);
}

function create() {
    this.player=this.add.sprite(25,300,"dude");
this.player.setBounce(0.2);
// this.player.setCollideWorldBounds(false);
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
