var cajas;
var lastc;
var cursors;
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });

  }
  
  preload() { 
    this.load.image('ground',"muro.png") ;
    this.load.image('select',"select.png") ;



  }

  create() {
   
    cajas=this.add.group();
     this.cursor_Space = this.input.keyboard.addKey('SPACE');
     this.S=this.input.keyboard.addKey('S');
     this.D=this.input.keyboard.addKey('D');

     this.matter.world.setBounds(0, 0, 1400, 800);

   
     cursors = this.input.keyboard.createCursorKeys();


  }

  update(time, delta) {    
  


if (this.input.keyboard.checkDown(this.cursor_Space, 250))
{
   
  let X = Phaser.Math.Between(100, 1300);
  let Y= Phaser.Math.Between(100, 700);
  
  
   let  caja=this.matter.add.image(X,Y,'ground').setScale(0.5);
    caja.setVelocityX( Phaser.Math.Between(-10, 10));
    caja.setVelocityY( Phaser.Math.Between(-10, 10));
    caja.setFrictionAir(0);
    caja.setBounce(1);
    caja.setInteractive();
    cajas.add(caja);
    caja.on('pointerdown', pointer =>{
     if(this.select!=undefined){this.select.setTexture("ground")}
      
     this.select=caja;
     
     caja.setTexture("select");
   });
}
if (cursors.left.isDown)
{
    //this.select.thrustLeft(0.1);
    this.select.applyForce({x:-0.5,y:0});

}
else if (cursors.right.isDown)
{
 // this.select.thrustRight(0.1);
 this.select.applyForce({x:0.5,y:0});

}

if (cursors.up.isDown)
{
  //this.select.thrust(0.1);
  this.select.applyForce({x:0,y:-0.5});

}
else if (cursors.down.isDown)
{
 // this.select.thrustBack(0.1);
 this.select.applyForce({x:0,y:0.5});
}

if (this.D.isDown && this.select!=undefined)
{
cajas.remove(this.select);
this.select.destroy();
this.select=cajas.getFirstAlive();
if(this.select!=null){
  this.select.setTexture("select");

}
/*if(lastc!=undefined){
  this.select=lastc;
  this.select.setTexture("select");
}*/
this.D.isDown=false;


}
if (this.S.isDown)
{
  if(this.select!=undefined)
  this.select.rotation++;
  this.S.isDown=false;
}

  }

}

