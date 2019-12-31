class MyCrane extends CGFobject
{
	constructor(scene)
	{	
	   super(scene);
	   this.cylinder = new MyCylinder(scene,20,4);
	   this.cylinderTop = new CylinderBase(scene,20,4);
	   this.prism = new MyPrism(scene,4,20);
	   this.prismTop = new CylinderBase(scene, 4, 20);
	   this.bigAngle = 90; //from -90 to 90 degrees
	   this.smallAngle = 10; //from -40 to 10 degrees
	   this.catchingCarDown = false;
	   this.catchingCarUp = false;
	   this.movingToD = false;
	   this.movingToR = false;
	   this.releasingCarDown = false;
	   this.releasingCarUp = false;
	   this.showVehicle = false;
	};
	/*Function that starts the animation*/
	startMovement()
	{
		this.catchingCarDown = true;
	}
	/*Function simulating states machine, that switches
	between the different states of animation*/
	changingState()
	{
		if(this.catchingCarDown && this.smallAngle == -40){
			this.catchingCarDown = false;
			this.catchingCarUp = true;
			this.showVehicle = true;
		}
		else if(this.catchingCarUp && this.smallAngle == 10)
		{
			this.catchingCarUp = false;
			this.movingToD = true;
		}
		else if(this.movingToD && this.bigAngle == -90)
		{
			this.movingToD = false;
			this.releasingCarDown = true;
		}
		else if(this.releasingCarDown && this.smallAngle == -40)
		{
			this.releasingCarDown = false;
			this.releasingCarUp = true;
			this.showVehicle = false;
			this.scene.vehicle.posX=-20;
	        this.scene.vehicle.posZ=12;
	        this.scene.vehicle.angle_car -= 180;
		}
		else if(this.releasingCarUp && this.smallAngle == 10)
		{
			this.releasingCarUp = false;
			this.movingToR = true;
		}
		else if(this.movingToR && this.bigAngle == 90)
			this.movingToR = false;
	}
	/*Function that changes the angles of the crane according
	to the state the crane is currently in*/
	update()
	{
		if(!this.catchingCarUp && !this.catchingCarDown
		  && !this.movingToD && !this.movingToR 
		  && !this.releasingCarUp && !this.releasingCarDown)
			return;
		
		if(this.catchingCarDown)
			this.smallAngle-=10;
		else if(this.catchingCarUp)
			this.smallAngle+=10;
		else if(this.movingToD)
			this.bigAngle-=10;
		else if(this.releasingCarDown)
			this.smallAngle-=10;
		else if(this.releasingCarUp)
			this.smallAngle+=10;
		else if(this.movingToR)
			this.bigAngle+=10; 

		this.changingState();
	}

	display()
	{
		this.scene.YellowCrane.apply();
	    this.scene.pushMatrix();
		
		//cylinder that serves as base
	       this.scene.rotate(270*degToRad, 1, 0, 0);
	       this.cylinder.display();
	    this.scene.pushMatrix();
	           this.scene.translate(0,0,1);
	           this.cylinderTop.display();
	    this.scene.popMatrix();

		//prism connected to the base of the crane
	       this.scene.rotate(this.bigAngle*degToRad, 0, 0, 1);
	       this.scene.DarkMetal.apply();
	    this.scene.pushMatrix();
	           this.scene.rotate(30*degToRad, 0, 1, 0);
	           this.scene.rotate(45*degToRad,0,0,1);
	           this.scene.scale(0.25, 0.25, 6);
	           this.prism.display();
	    this.scene.popMatrix();
	       
	       //cylinder that serves as articulation between prisms
	       this.scene.YellowCrane.apply();
	       this.scene.rotate(90*degToRad, 0, 0, 1);
	       this.scene.rotate(270*degToRad, 0, 1, 0);
	       this.scene.translate(5.2, -3, -0.25);
	    this.scene.pushMatrix();
	       this.scene.scale(0.25,0.25,0.5);
	       this.cylinder.display();
	       
	    this.scene.pushMatrix();
	           this.scene.rotate(180*degToRad,1,0,0);
	           this.cylinderTop.display();
	    this.scene.popMatrix();
	       
	    this.scene.pushMatrix();
	       		this.scene.translate(0,0,1);
	       		this.cylinderTop.display();
	    this.scene.popMatrix();
	    this.scene.popMatrix();
			
			this.scene.DarkMetal.apply();
		//prism that serves as arm of the crane
		this.scene.pushMatrix();
				this.scene.rotate(this.smallAngle*degToRad, 0,0,1);
				this.scene.translate(0,0,0.25);
		this.scene.pushMatrix();
				this.scene.rotate(90*degToRad,1,0,0);
				this.scene.rotate(45*degToRad,0,0,1);
				this.scene.scale(0.25, 0.25, 3);			
	      		this.prism.display();	
	      		      		
	    this.scene.pushMatrix();
	      			this.scene.translate(0,0,1);
	      			this.prismTop.display();
	    this.scene.popMatrix();

	    this.scene.popMatrix();
	      		
		this.scene.pushMatrix();
			this.scene.rotate(180*degToRad,0,0,1);
	      	this.scene.translate(0,2.8,0);
	      	this.scene.rotate(-1*this.smallAngle*degToRad, 0,0,1);
	      	this.scene.rotate(90*degToRad, 0, 1, 0);
	      	
	      //small cylinder to hold crane's magnet
		this.scene.pushMatrix();
	      		this.scene.scale(0.05, 0.05, 1);
	      		this.cylinder.display();
	    this.scene.popMatrix();
		
		//cylinder representing crane's magnet
			this.scene.YellowCrane.apply();
			this.scene.translate(0,0,1);
		this.scene.pushMatrix();
			this.scene.scale(0.8,0.8,0.5);
			this.cylinder.display();

		this.scene.pushMatrix();
				this.scene.translate(0,0,1);
				this.cylinderTop.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
				this.scene.rotate(180*degToRad,0,1,0);
				this.cylinderTop.display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		//showing vehicle
			if(this.showVehicle)
			{
				this.scene.vehicle.posX = 0;
				this.scene.vehicle.posZ = 0;
				this.scene.vehicle.speed = 0;
				this.scene.rotate(-90*degToRad, 1,0,0);
				this.scene.translate(0,-2.15,0);
				this.scene.rotate(180*degToRad, 0,1,0);
				this.scene.scale(1/1.2,1/1.2,1/1.2);
				this.scene.vehicle.display();
			}
			this.scene.popMatrix();

	       this.scene.popMatrix();

	    this.scene.popMatrix();

	};
};