/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	};

	initBuffers() 
	{
		this.angle = 360/this.slices * Math.PI / 180;
		this.vertices = [];

		this.indices = [];

		this.normals = [];

		this.texCoords = [];
			
			this.angle2 = this.angle;
		
		var n = 0;
		for(var j = 0; j < this.stacks; j++)
		{
		for(var i = 0; i < this.slices; i++)
		{
			this.vertices.push(Math.cos(this.angle2), Math.sin(this.angle2), j/this.stacks);
			this.vertices.push(Math.cos(this.angle2), Math.sin(this.angle2), (j+1)/this.stacks);
			this.angle2 = this.angle2 + this.angle;
			this.normals.push(Math.cos(this.angle2-this.angle/2), Math.sin(this.angle2-this.angle/2), 0);
			this.normals.push(Math.cos(this.angle2-this.angle/2), Math.sin(this.angle2-this.angle/2), 0);
			this.texCoords.push(0, j/this.stacks);
			this.texCoords.push(0, (j+1)/this.stacks);
			this.texCoords.push(1, j/this.stacks);
			this.texCoords.push(1, (j+1)/this.stacks);

			this.vertices.push(Math.cos(this.angle2), Math.sin(this.angle2), j/this.stacks);
			this.vertices.push(Math.cos(this.angle2), Math.sin(this.angle2), (j+1)/this.stacks);
		
			this.normals.push(Math.cos(this.angle2-this.angle/2), Math.sin(this.angle2-this.angle/2), 0);
			this.normals.push(Math.cos(this.angle2-this.angle/2), Math.sin(this.angle2-this.angle/2), 0);
			this.indices.push(n, n+2, n+1);
			this.indices.push(n+3, n+1, n+2);
			n+=4;
		}
		this.angle2 = this.angle;
		}

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
