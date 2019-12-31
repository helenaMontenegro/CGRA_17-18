/**
 * MyTrapeze
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapeze extends CGFobject
{
	constructor(scene, diff_x) 
	{
		super(scene);
		this.plane = new Plane(this.scene, 100, 0, 1, 0, 1);
		this.trapezeFront = new MyTrapezeBase(this.scene,0,1,0,1,diff_x,1);
		this.trapezeBack = new MyTrapezeBase(this.scene,0,1,0,1,diff_x,0);
        //difference between major base and minor base.
		this.diff_x = diff_x;
		this.angle = Math.atan(1/diff_x);
	};

	display()
	{
	     //drawing back of trapeze
	    this.scene.pushMatrix();
	    	this.scene.translate(0.5,0.5,0);
	    	this.scene.rotate(180*degToRad, 0,1,0);
	    	this.plane.display();
	    this.scene.popMatrix();

        //drawing bottom of trapeze
        this.scene.pushMatrix();
	   	 	this.scene.rotate(90*degToRad,0,1,0);
	   	 	this.scene.rotate(90*degToRad,1,0,0);
			this.scene.scale(this.diff_x + 1,1,1);
	    	this.scene.translate(-0.5,0.5,0);
	    	this.plane.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
	    	this.scene.rotate(270*degToRad, 0, 1, 0);
	    	this.trapezeFront.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
	    	this.scene.translate(1,0,0);
	    	this.scene.rotate(270*degToRad, 0, 1, 0);
	    	this.trapezeBack.display();
	    this.scene.popMatrix();

	    //drawing top of trapeze
		this.scene.pushMatrix();
	    	this.scene.translate(0.5,1,0.5);
	    	this.scene.rotate(270*degToRad,1,0,0);
	    	this.plane.display();
	    this.scene.popMatrix();

		var size = Math.sqrt(1+Math.pow(this.diff_x,2));
	    //drawing diagonal top of trapeze
	    this.scene.pushMatrix();
	   		this.scene.translate(0.5,0.5,1+this.diff_x/2);
	    	this.scene.rotate(this.angle + 270*degToRad,1,0,0);
	    	this.scene.scale(1,size,1);
	    	this.plane.display();
	    this.scene.popMatrix();

	};
};