/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends Plane
{
    constructor(scene, nrDivs, altimetry)
    {
        super(scene,nrDivs,0,1,0,1);
        this.altimetry = altimetry;
		this.insertAltimetry();
    };

    insertAltimetry()
	{
		/* For every vertex, the z coordinate which is the 
		third coordinate of every vertex is changed according
		to the altimetry of the terrain
		*/
		for (var j = 0; j <= this.nrDivs; j++) 
		{
			for (var i = 0; i <= this.nrDivs; i++) 
				this.vertices[(j*(this.nrDivs+1) + i)*3+2] = this.altimetry[j][i];
		}
		this.initGLBuffers();
	};

	canCarMove(posX, posZ)
	{
		var px = posX;
		var pz = posZ;
		/*turning posX and posZ into integers*/
		if(posX % 1 > 0.5)
			posX = Math.ceil(posX);
		else
			posX = Math.floor(posX);
		if(posZ % 1 > 0.5)
			posZ = Math.ceil(posZ);
		else
			posZ = Math.floor(posZ);
		/*The car has to be between the vertexes corresponding to 
		0.0 in altitude so, for posX and posZ, we need to 
		verify whether the car is standing in altitude zero
		and which are the places next to it with altitude zero,
		to make sure the car is always in a place between the
		adjacent vertexes with altitude 0.0.*/
		if(this.altimetry[posZ][posX] == 0.0)
		{
			if(this.altimetry[posZ+1][posX] == 0.0
			&& !this.altimetry[posZ-1][posX] == 0.0){
				if(pz < posZ || pz > posZ+1)
					return false;
			}
			else if (!this.altimetry[posZ+1][posX] == 0.0
			&& this.altimetry[posZ-1][posX] == 0.0)
			{
				if(pz > posZ || pz < posZ-1)
					return false;
			}
			if(this.altimetry[posZ][posX+1] == 0.0
			&& !this.altimetry[posZ][posX-1] == 0.0){
				if(px < posX || px > posX+1)
					return false;
			}
			else if (!this.altimetry[posZ][posX+1] == 0.0
			&& this.altimetry[posZ][posX-1] == 0.0)
			{
				if(px > posX || px < posX-1)
					return false;
			}
			return true;
		}
		else
			return false;
	}

    display()
    {
    	this.scene.terrainAppearance.apply();
        this.scene.pushMatrix();
            this.scene.rotate(270*degToRad, 1,0,0);
            this.scene.scale(50,50,1);
            this.drawElements(this.primitiveType);
        this.scene.popMatrix();
    };
};