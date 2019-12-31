
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class Plane extends CGFobject{

	constructor(scene, nrDivs,minS,maxS,minT,maxT) 
	{
		super(scene);

		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		
		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		this.indices = [];

		this.initBuffers();
	};

	initBuffers()
	{
		var yCoord = 0.5;

		this.deltaT = this.maxT - this.minT;
		this.deltaS = this.maxS - this.minS;

		for (var j = 0; j <= this.nrDivs; j++) 
		{
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.vertices.push(xCoord, yCoord, 0);
				this.normals.push(0,0,1);
				this.texCoords.push(this.minS + i*this.deltaS/this.nrDivs , this.minT + j*this.deltaT/this.nrDivs);
				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
		
		var ind=0;


		for (var j = 0; j < this.nrDivs; j++) 
		{
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.indices.push(ind);
				this.indices.push(ind+this.nrDivs+1);

				ind++;
			}
			if (j+1 < this.nrDivs)
			{
				this.indices.push(ind+this.nrDivs);
				this.indices.push(ind);
			}
		}
		
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	};

};