class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	
	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();


		var group = this.gui.addFolder("Luzes");
    	group.open();

   		group.add(this.scene, 'luz0');
        group.add(this.scene, 'luz1');
        group.add(this.scene, 'luz2');


		this.gui.add(this.scene, 'speed', -10, 10).listen();

		this.gui.add(this.scene, 'eixos');
		this.gui.add(this.scene, 'vehicleTexture', ['DarkMetal', 'RedMetal', 'GreyMetal', 'Camouflage', 'Camouflage2', 'SuperCamouflage']);
		
		this.initKeys();
		return true;
	};

	initKeys() {
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
	};

	processKeyDown(event) {
		this.activeKeys[event.code]=true;
	};

	processKeyUp(event) {
		this.activeKeys[event.code]=false;
	};

	isKeyPressed(keyCode) {
	return this.activeKeys[keyCode] || false;
	};

};
