/**
 * MyWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheel extends CGFobject
{
	constructor(scene)
	{	
		super(scene);
	
		this.cylinder = new MyCylinder(this.scene,20,4);
		this.rightCylinderTop = new MyHalfSphere(this.scene, 60, 4);//new CylinderBase(this.scene,20);
		this.leftCylinderTop = new MyHalfSphere(this.scene, 60, 4);//new CylinderBase(this.scene,20);
		
	};

	display() 
	{
		this.scene.pushMatrix();
			this.scene.tireAppearance.apply();
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		  	this.scene.translate(0,0,1);
		  	this.scene.scale(1,1,0.2);
		  	this.scene.wheelAppearance.apply();
		  	this.rightCylinderTop.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(1,1,0.2);
			this.scene.rotate(180*degToRad,0,1,0);
			this.scene.wheelAppearance.apply();
			this.leftCylinderTop.display();
		this.scene.popMatrix();
	};
};
