/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.quad = new MyQuad(this.scene,0,1,0,1);
		this.quad.initBuffers();
	};

	display()
	{
	    //drawing face perpendicular to z axis, in front
	    this.scene.pushMatrix();
	    this.scene.translate(0,0,0.5);
	    this.quad.display();
	    this.scene.popMatrix();

        //drawing face perpendicular to x axis, in front
	    this.scene.pushMatrix();
	    this.scene.rotate(90*Math.PI/180, 0, 1, 0);
	    this.scene.pushMatrix();
	    this.scene.translate(0,0,0.5);
	    this.quad.display();
	    this.scene.popMatrix();
	    
	    //drawing face perpendicular to z axis, on the back
	    this.scene.rotate(90*Math.PI/180, 0, 1, 0);
	    this.scene.pushMatrix();
	    this.scene.translate(0,0,0.5);
	    this.quad.display();
	    this.scene.popMatrix();

        //drawing face perpendicular to x axis, on the back
	    this.scene.rotate(90*Math.PI/180, 0, 1, 0);
	    this.scene.pushMatrix();
	    this.scene.translate(0,0,0.5);
	    this.quad.display();
	    this.scene.popMatrix();
	    this.scene.popMatrix();

	    //drawing face perpendicular to y axis, on bottom
	    this.scene.rotate(90*Math.PI/180, 1, 0, 0);
	    this.scene.pushMatrix();
	    this.scene.translate(0,0,0.5);
	    this.quad.display();
	    this.scene.popMatrix();

	    //drawing face perpendicular to y axis, on top
	    this.scene.rotate(90*Math.PI/180, 1, 0, 0);
	    this.scene.rotate(90*Math.PI/180, 1, 0, 0);
	    this.scene.translate(0,0,0.5);
	    this.quad.display();
	};
};