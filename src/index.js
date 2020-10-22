import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import dudeImg from "./assets/images/dude.png";
import mountains from "./assets/images/mountain-skyline.png";
import skyClouds from "./assets/images/sky-clouds.jpg";


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 2000,
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
var cursors;
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
    let bg=this.add.image(0, 0, 'mountains').setOrigin(0,0);
    // Align.scaleToGameW(bg,2);

    this.cameras.main.setBounds(0,0,5000,bg.displayHeight);

    this.player=this.physics.add.sprite(25,550,"dude");
    this.player.setBounce(0.2);

    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player);
  
    cursors = this.input.keyboard.createCursorKeys();

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
    if (cursors.left.isDown){
        this.player.setVelocityX(-160);
        this.player.anims.play("left",true);
    }
    else if (cursors.right.isDown){
        this.player.setVelocityX(160);
        this.player.anims.play("right", true);
    }
    else {
        this.player.setVelocityX(0);
        this.player.anims.play("turn");
    }
    if ((cursors.up.isDown || cursors.space.isDown)  && this.player.body.onFloor()){
        this.player.setVelocityY(-330);
    }

}
