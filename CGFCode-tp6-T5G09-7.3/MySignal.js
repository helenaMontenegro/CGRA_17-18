class MySignal extends CGFobject
{
	constructor(scene)
	{	
		super(scene);
		this.cylinder = new MyCylinder(scene, 20, 10);
		this.cube = new MyUnitCubeQuad(scene);
		this.quad = new Plane(scene,10,0,1,0,1);
	};
    
    display()
    {
        this.scene.materialDefault.apply();
        this.scene.pushMatrix();
            this.scene.rotate(-90*degToRad, 1, 0, 0);
            this.scene.scale(0.1,0.1,3.6);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,4.5,0);
            this.scene.pushMatrix();
                this.scene.scale(2,2,0.1);
                this.cube.display();
            this.scene.popMatrix();

            this.scene.parking.apply();
            this.scene.rotate(180*degToRad,0,1,0);
            this.scene.translate(0,0,0.1);
            this.scene.scale(2,2,1);
            this.quad.display();
        this.scene.popMatrix();
    };
};