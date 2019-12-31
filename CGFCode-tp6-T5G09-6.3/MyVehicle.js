class MyVehicle extends CGFobject
{
	constructor(scene)
	{	
		super(scene);
		this.wheel = new MyWheel(this.scene);
		this.cube = new MyUnitCubeQuad(this.scene);
		this.planePlate = new Plane(this.scene, 30, 0.02,0.98,0.05,0.95);
		this.planeGlass = new Plane(this.scene, 90, 0.1,0.9,0.1,0.9);
		this.trapezeFront = new MyTrapeze(this.scene,0.7);
		this.trapezeBack = new MyTrapeze(this.scene,0.5);
		this.trapezeBase=new MyTrapezeBase(this.scene,0.1,0.9,0.1,0.9,0.99,0);
		this.trapezeBase2=new MyTrapezeBase(this.scene,0.1,0.9,0.1,0.9,0.99,1);
		this.cylinder = new MyCylinder(this.scene, 20,4);
		this.halfSphere = new MyHalfSphere(this.scene, 20, 4);
		this.front = new MyHalfSphere(this.scene,20,4);
		this.cylinderTop = new CylinderBase(this.scene,20,4);
		this.angle_front = 0; //angle to turn wheels to move forward
		this.angle_side = 0; //angle to turn wheels to change direction
		this.angle_car = 0;//angle that defines car's direction
		this.posX = 0;
		this.posZ = -1;
	};

	move(front, back, right, left)
	{
		if(right && left)
		{
			right = false;
			left = false;
		}
		if(back && front)
		{
			front = false;
			back = false;
		}
		//arrow up and arrow down change car's speed
		if(front)
		{
			this.scene.speed += 0.5;
			if(this.scene.speed > 10)
				this.scene.speed = 10;
		}
		if (back) 
		{
			this.scene.speed -= 0.5;
			if(this.scene.speed < -10)
				this.scene.speed = -10;
		}
		//arrow right and arrow left change front wheel's direction
		if (right)
		{
			this.angle_side -= 10;
			if(this.angle_side < -45)
				this.angle_side = -45;
		}
		if (left)
		{
			this.angle_side += 10;
			if(this.angle_side > 45)
				this.angle_side = 45;
		}
		/*if speed is different than zero and the car's front wheels
		are turned some way (angle_side != 0) the car's body has to
		rotate accordingly, towards the direction of the wheels
		and as the angle of the car changes, the angle of the wheels
		also change to go back to their initial position
		*/
		if(this.scene.speed <= -0.1 || this.scene.speed >= 0.1)
		{
		if(this.angle_side < 0)
			{	
				if(this.scene.speed > 0)
					this.angle_car -= 5;
				else this.angle_car += 5;
				this.angle_side += 5;
				if(this.angle_side > 0)
					this.angle_side = 0;
			}
			else if(this.angle_side > 0)
			{
				if(this.scene.speed > 0)
					this.angle_car += 5;
				else this.angle_car -= 5;
				this.angle_side -= 5;
				if(this.angle_side < 0)
					this.angle_side = 0;
			}
		}

		/*the position of the car is set according to its speed and
		its direction. All the wheels also rotate with the speed of 
		the car (angle_front). Before moving the car, we need to check
		if the car doesn't go to places higher than 0.0.
		*/

		var next_posx = this.posX + Math.cos(this.angle_car*degToRad)*this.scene.speed/25;
		var next_posz = this.posZ- Math.sin(this.angle_car*degToRad)*this.scene.speed/25;
		var canMove = this.scene.terrain.canCarMove((next_posx + 25)/50*16, (next_posz + 25)/50*16)
		if(!canMove)
		{
			this.scene.speed = 0.0;
		}
		else
		{
			this.posX = next_posx;
			this.posZ = next_posz;
		}
		this.angle_front -= this.scene.speed/25 / (2*Math.PI)*360;
	}


display() 
	{
		this.scene.pushMatrix();
		this.scene.translate(this.posX,0,this.posZ);
		this.scene.rotate(this.angle_car*degToRad,0,1,0);
		this.scene.translate(-1.75,0,-1);
		
		//displaying back wheels
		this.scene.pushMatrix();
			this.scene.scale(0.5,0.5,0.5);
			this.scene.translate(1,1,-0.2);
			this.scene.rotate(this.angle_front*degToRad,0,0,1);
			this.wheel.display();
			this.scene.translate(0,0,3.3);
			this.wheel.display();
		this.scene.popMatrix();

		//displaying front wheels
		this.scene.pushMatrix();
			this.scene.scale(0.5,0.5,0.5);
			this.scene.translate(4.5,1,0.3);
			this.scene.pushMatrix();
				this.scene.rotate(this.angle_side*degToRad, 0,1,0);
				this.scene.translate(0,0,-0.5);
				this.scene.rotate(this.angle_front*degToRad,0,0,1);
				this.wheel.display();
			this.scene.popMatrix();
			this.scene.translate(0,0,3.3);
			this.scene.rotate(this.angle_side*degToRad, 0,1,0);
			this.scene.translate(0,0,-0.5);
			this.scene.rotate(this.angle_front*degToRad,0,0,1);
			this.wheel.display();
		this.scene.popMatrix();
		
		this.scene.translate(0,0.5,0);
		this.scene.scale(0.7,1,1);
		this.scene.vehicleAppearances[this.scene.currVehicleAppearance].apply();
		
		//displaying cube directly on top of wheels	
		this.scene.pushMatrix();
			this.scene.scale(3.5,0.8,2);
			this.scene.translate(0.5,0.5,0.5);
			this.cube.display();
		this.scene.popMatrix();

		//displaying prism with trapeze as base on car's front
		this.scene.pushMatrix();
			this.scene.scale(1.25,0.7,2);
			this.scene.rotate(90*degToRad, 0,1,0);
			this.scene.translate(-1,1.14,1.10);
			this.trapezeFront.display();
		this.scene.popMatrix();

		//displaying prism with trapeze as base on car's back
		this.scene.pushMatrix();
			this.scene.scale(1,0.7,2);
			this.scene.rotate(270*degToRad, 0,1,0);
			this.scene.translate(0,1.14,-1.5);
			this.trapezeBack.display();
		this.scene.popMatrix();

		//displaying cylinder representative of car's front
		this.scene.pushMatrix();
			this.scene.scale(1.2,0.4,2);
			this.scene.translate(3,1,0);
			
			this.scene.pushMatrix();
				this.scene.translate(0,0,1);
				this.cylinderTop.display();
			this.scene.popMatrix();
		
			this.scene.pushMatrix();
				this.scene.rotate(180*degToRad,0,1,0);
				this.cylinderTop.display();
			this.scene.popMatrix();
			
			this.cylinder.display();
		this.scene.popMatrix();

		//displaying cylinder representative of car's back
		this.scene.pushMatrix();
			this.scene.scale(0.3,0.5,2);
			this.scene.translate(0,1,0);
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

		//displaying half spheres representing headlights
		this.scene.headlightAppearance.apply();
		this.scene.pushMatrix();
			this.scene.rotate(90*degToRad, 0,1,0);
			this.scene.translate(-0.20,0.4,4.7);
			this.scene.scale(0.2,0.2,0.2);
			this.halfSphere.display();
			this.scene.translate(-8,0,0);
			this.halfSphere.display();
		this.scene.popMatrix();


		//displaying half spheres for back headlights
		this.scene.backlightAppearance.apply();
		this.scene.pushMatrix();
			this.scene.rotate(270*degToRad, 0,1,0);
			this.scene.translate(0.29,0.55,0.28);
			this.scene.scale(0.18,0.1,0.1);
			this.halfSphere.display();
			this.scene.translate(8,0,0);
			this.halfSphere.display();
		this.scene.popMatrix();

		//displaying front glass
		this.scene.pushMatrix();
			this.scene.glassAppearance.apply();
			this.scene.scale(1.25,0.7,1.8);
			this.scene.rotate(90*degToRad, 0,1,0);
			this.scene.translate(-0.55,1.65,2.45);
			this.scene.rotate(this.trapezeFront.angle+270*degToRad, 1,0,0);
			this.planeGlass.display();
		this.scene.popMatrix();


		//displaying side glasses
		this.scene.pushMatrix();
			this.scene.glassAppearance.apply();
			this.scene.scale(0.7,0.6,0.5);
			this.scene.translate(2.7,1.35,-0.01);
			this.trapezeBase.display();

			this.scene.translate(0,0,4.017);
			this.trapezeBase2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.glassAppearance.apply();
			this.scene.scale(1,0.6,1);
			this.scene.rotate(180*degToRad,1,0,0);
			this.scene.translate(1.25,-1.849,0.01);
			this.planeGlass.display();

			this.scene.rotate(180*degToRad,1,0,0);
			this.scene.translate(0,0,2.015);
			this.planeGlass.display();

		this.scene.popMatrix();

		//displaying back glass
		
		this.scene.pushMatrix();
			this.scene.glassAppearance.apply();
			this.scene.scale(0.8,0.4,1.6);
			this.scene.rotate(-90*degToRad, 0,1,0);
			this.scene.translate(0.63,3.01,-0.357);
			this.scene.rotate(this.trapezeFront.angle+285.5*degToRad, 1,0,0);
			this.planeGlass.display();
		this.scene.popMatrix();

		//displaying plate
		this.scene.pushMatrix();
			this.scene.plateAppearance.apply();
			this.scene.scale(1,0.18,0.8);
			this.scene.rotate(270*degToRad, 0,1,0);
			this.scene.translate(1.24,1.9,0.3);
			this.planePlate.display();
		this.scene.popMatrix();

		//displaying front brand simbol
		this.scene.pushMatrix();
			this.scene.carBrandAppearance.apply();
			this.scene.translate(4.85,0.40,1);
			this.scene.rotate(180*degToRad, 0,0,1);
			this.scene.rotate(-90*degToRad, 0,1,0);
			this.scene.scale(0.08,0.08,0.0);
			this.cylinderTop.display();
		this.scene.popMatrix();

		//displaying back brand simbol
		this.scene.pushMatrix();
			this.scene.carBrandAppearance.apply();
			this.scene.translate(-0.2879,0.7,1);
			this.scene.rotate(180*degToRad, 0,0,1);
			this.scene.rotate(90*degToRad, 0,1,0);
			this.scene.scale(0.08,0.08,0.0);
			this.cylinderTop.display();
		this.scene.popMatrix();

		//------displaying decoration (frizos)-----
		//lados
		this.scene.pushMatrix();
			this.scene.glassAppearance.apply();
			this.scene.scale(1,0.03,0.5);
			this.scene.rotate(180*degToRad, 0,1,0);
			this.scene.translate(-2,7,0.01);
			this.planePlate.display();
			
			this.scene.translate(0,-2,0);
			this.planePlate.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.glassAppearance.apply();
			this.scene.translate(1.95,0.2,2.01);
			this.scene.scale(1,0.03,0.5);
			this.planePlate.display();
			
			this.scene.translate(0,-2,0);
			this.planePlate.display();
		this.scene.popMatrix();

		//back
		this.scene.pushMatrix();
			this.scene.glassAppearance.apply();
			this.scene.scale(1,0.02,0.9);
			this.scene.rotate(-90*degToRad, 0,1,0);
			this.scene.translate(1.1,10,0.25);
			this.planePlate.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.glassAppearance.apply();
			this.scene.scale(1,0.02,0.9);
			this.scene.rotate(-90*degToRad, 0,1,0);
			this.scene.translate(1.1,8,0.25);
			this.planePlate.display();
		this.scene.popMatrix();

		//displaying car front 

		this.scene.pushMatrix();
			this.scene.carfrontAppearance.apply();
			this.scene.scale(1,0.2,0.9);
			this.scene.rotate(90*degToRad, 0,1,0);
			this.scene.translate(-1.1,2,4.8);
			this.planePlate.display();
		this.scene.popMatrix();

		//mirrors
		this.scene.pushMatrix();
		this.scene.translate(0,-0.2,0)

		this.scene.pushMatrix();
			this.scene.vehicleAppearances[this.scene.currVehicleAppearance].apply();
			this.scene.translate(3.1,1,-0.22);
			this.scene.rotate(90*degToRad, 0,1,0);
			this.scene.rotate(90*degToRad, 0,0,1);
			this.scene.scale(0.08,0.14,0.1);
			this.cylinder.display();

		this.scene.pushMatrix();
			this.scene.glassAppearance.apply();
			this.scene.rotate(180*degToRad, 0,1,0);
			this.cylinderTop.display();
		this.scene.popMatrix();

		this.scene.vehicleAppearances[this.scene.currVehicleAppearance].apply();
		this.scene.translate(0,17.6,0);
			this.cylinder.display();
			this.scene.pushMatrix();

			this.scene.glassAppearance.apply();
			this.scene.rotate(180*degToRad, 0,1,0);
			this.cylinderTop.display();
		this.scene.popMatrix();

		this.scene.popMatrix();


		this.scene.pushMatrix();
			this.scene.decorationAppearance.apply();
			this.scene.translate(3.,1.01,0.05);
			this.scene.pushMatrix();
			this.scene.rotate(150*degToRad, 0,1,0);
			this.scene.scale(0.04,0.03,0.19);
			this.cylinder.display();
			this.scene.popMatrix();
			
			this.scene.translate(0.18,0,2.1);
			this.scene.rotate(-150*degToRad, 0,1,0);
			this.scene.scale(0.04,0.03,0.19);
			this.cylinder.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.vehicleAppearances[this.scene.currVehicleAppearance].apply();
			this.scene.translate(3.2,1,-0.22);
			this.scene.rotate(90*degToRad, 0,1,0);
			this.scene.scale(0.14,0.08,0.1);
			this.halfSphere.display();
			this.scene.translate(-17.6,0,0);
			this.halfSphere.display();
		this.scene.popMatrix();

		this.scene.popMatrix();

		//displaying exhaust pipe
		this.scene.pushMatrix();
			this.scene.decorationAppearance.apply();
			this.scene.scale(0.3,0.05,0.05);
			this.scene.rotate(90*degToRad, 0,1,0);
			this.scene.translate(-2.5,1.28,-1.2);
			this.cylinder.display();
			this.scene.rotate(180*degToRad, 0,1,0);
			
			this.cylinderTop.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	};
};