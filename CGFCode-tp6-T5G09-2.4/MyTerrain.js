/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends Plane
{
    constructor(scene, nrDivs)
    {
        super(scene,nrDivs,0,1,0,1);
    };

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