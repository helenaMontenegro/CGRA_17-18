var degToRad = Math.PI / 180.0;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	init(application) 
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.enableTextures(true);

		this.gl.clearColor(0.61, 0.84, 0.87, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);
		// Scene elements
		this.vehicle = new MyVehicle(this);
		this.terrain = new MyTerrain(this, 16);

		// Materials
		this.materialDefault = new CGFappearance(this);

		//Textures
		this.wheelAppearance = new CGFappearance(this);
		this.wheelAppearance.setDiffuse(0.9,0.9,0.9,1.0);
		this.wheelAppearance.setSpecular(0.1,0.1,0.1,1);
		this.wheelAppearance.setShininess(255);
		this.wheelAppearance.loadTexture("resources/images/wheel.png");

		this.tireAppearance = new CGFappearance(this);
		this.tireAppearance.setDiffuse(0.9,0.9,0.9,1.0);
		this.tireAppearance.setSpecular(0.1,0.1,0.1,1);
		this.tireAppearance.setShininess(255);
		this.tireAppearance.loadTexture("resources/images/tire1.jpg");

		this.terrainAppearance = new CGFappearance(this);
		this.terrainAppearance.setDiffuse(0.8,0.8,0.8,1.0);
		this.terrainAppearance.setSpecular(0.1,0.1,0.1,1);
		this.terrainAppearance.setAmbient(0.4,0.4,0.4,1);
		this.terrainAppearance.setShininess(50);
		this.terrainAppearance.loadTexture("resources/images/terrain.jpg");
		this.terrainAppearance.setTextureWrap('REPEAT','REPEAT');

		this.glassAppearance = new CGFappearance(this);
   		this.glassAppearance.setAmbient(0.8, 0.8, 0.8, 1);
		this.glassAppearance.setDiffuse(0.3,0.3,0.3,1.0);
		this.glassAppearance.setSpecular(1,1,1,1);
		this.glassAppearance.setShininess(255);
		this.glassAppearance.loadTexture("resources/images/glass.png");

		this.plateAppearance = new CGFappearance(this);
   		this.plateAppearance.setAmbient(0.8, 0.8, 0.8, 1);
		this.plateAppearance.setDiffuse(0.3,0.3,0.3,1.0);
		this.plateAppearance.setSpecular(1,1,1,1);
		this.plateAppearance.setShininess(255);
		this.plateAppearance.loadTexture("resources/images/matricula.png");

		this.headlightAppearance = new CGFappearance(this);
   		this.headlightAppearance.setAmbient(0.8, 0.8, 0.8, 1);
		this.headlightAppearance.setDiffuse(0.3,0.3,0.3,1.0);
		this.headlightAppearance.setSpecular(1,1,1,1);
		this.headlightAppearance.setShininess(255);
		this.headlightAppearance.loadTexture("resources/images/farol.png");

		this.backlightAppearance = new CGFappearance(this);
   		this.backlightAppearance.setAmbient(0.8, 0.8, 0.8, 1);
		this.backlightAppearance.setDiffuse(0.3,0.3,0.3,1.0);
		this.backlightAppearance.setSpecular(1,1,1,1);
		this.backlightAppearance.setShininess(255);
		this.backlightAppearance.loadTexture("resources/images/backlight.png");

		this.decorationAppearance = new CGFappearance(this);
		this.decorationAppearance.setDiffuse(0.9,0.9,0.9,1.0);
		this.decorationAppearance.setSpecular(0.1,0.1,0.1,1);
		this.decorationAppearance.setShininess(255);
		this.decorationAppearance.loadTexture("resources/images/darkColorDecoration.jpg");

		this.carBrandAppearance = new CGFappearance(this);
		this.carBrandAppearance.setDiffuse(0.9,0.9,0.9,1.0);
		this.carBrandAppearance.setSpecular(0.1,0.1,0.1,1);
		this.carBrandAppearance.setShininess(255);
		this.carBrandAppearance.loadTexture("resources/images/brandSymbol.png");

		this.carfrontAppearance = new CGFappearance(this);
		this.carfrontAppearance.setDiffuse(0.9,0.9,0.9,1.0);
		this.carfrontAppearance.setSpecular(0.1,0.1,0.1,1);
		this.carfrontAppearance.setShininess(255);
		this.carfrontAppearance.loadTexture("resources/images/carFront.jpg");

		this.DarkMetal = new CGFappearance(this);
   		this.DarkMetal.setAmbient(0.8, 0.8, 0.8, 1);
  	  	this.DarkMetal.setDiffuse(0.2, 0.2, 0.2, 1);
  	  	this.DarkMetal.setSpecular(1, 1, 1, 1);
    	this.DarkMetal.loadTexture("resources/images/gray.png");
		
		this.RedMetal = new CGFappearance(this);
   		this.RedMetal.setAmbient(0.8, 0.8, 0.8, 1);
  	  	this.RedMetal.setDiffuse(0.2, 0.2, 0.2, 1);
  	  	this.RedMetal.setSpecular(1, 1, 1, 1);
    	this.RedMetal.loadTexture("resources/images/red.jpg");

    	this.GreyMetal = new CGFappearance(this);
   		this.GreyMetal.setAmbient(0.6, 0.6, 0.6, 1);
  	  	this.GreyMetal.setDiffuse(0.2, 0.2, 0.2, 1);
  	  	this.GreyMetal.setSpecular(1, 1, 1, 1);
    	this.GreyMetal.loadTexture("resources/images/lightGray.jpg");

		this.Camouflage2 = new CGFappearance(this);
   		this.Camouflage2.setAmbient(0.8, 0.8, 0.8, 1);
  	  	this.Camouflage2.setDiffuse(0.2, 0.2, 0.2, 1);
    	this.Camouflage2.setSpecular(1, 1, 1, 1);
    	this.Camouflage2.loadTexture("resources/images/camouflage2.png");
    			
    	this.Camouflage = new CGFappearance(this);
   		this.Camouflage.setAmbient(0.8, 0.8, 0.8, 1);
  	  	this.Camouflage.setDiffuse(0.2, 0.2, 0.2, 1);
    	this.Camouflage.setSpecular(1, 1, 1, 1);
    	this.Camouflage.loadTexture("resources/images/camouflage.png");

	this.vehicleAppearances = [
			this.DarkMetal, 
			this.RedMetal, 
			this.GreyMetal,
			this.Camouflage,
			this.Camouflage2,
			this.terrainAppearance];
			
    this.vehicleAppearancesList = {
        'DarkMetal': 0,
        'RedMetal': 1,
        'GreyMetal': 2,
        'Camouflage': 3,
        'Camouflage2': 4,
        'SuperCamouflage':5
    }
    this.vehicleTexture = 'DarkMetal';
    this.currVehicleAppearance = this.vehicleAppearancesList[this.vehicleTexture];


		this.setUpdatePeriod(100);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);//0.5,0.5,0.5, 1.0);
		
		// Positions for four lights
		this.lights[0].setPosition(20, 7, 20, 1.0);
		this.lights[0].setVisible(false); // show marker on light position (different from enabled)
		this.lights[1].setPosition(-20, 7,20.5,1);//6.0, 5.0, 1.0);
		this.lights[1].setVisible(false); // show marker on light position (different from enabled)
		this.lights[2].setPosition(-20, 7, -20, 1.0);
		this.lights[2].setVisible(false); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0.9, 0.9, 0.9, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1.0,1.0,1.0);
		this.lights[0].enable();

		this.lights[2].setAmbient(0.2, 0.2, 0.2, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1,1.0,1.0,1.0);
		this.lights[2].enable();

		this.lights[1].setAmbient(0.2, 0.2, 0.2, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1,1.0,1.0,1.0);
		this.lights[1].enable();
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	display() 
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.showAxis)
			this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		this.terrain.display();	
		this.vehicle.display();
		// ---- END Scene drawing section
	};
};