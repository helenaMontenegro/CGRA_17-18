/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
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
		this.vertices = [
		];

		this.indices = [
		];

		this.normals = [
		];

		this.texCoords = [];
			this.angle2 = this.angle;
			var n = 0, d = 0;
			for(var j = 0; j < this.stacks; j++)
		{
		for(var i = 0; i < this.slices; i++)
		{
			this.vertices.push(Math.cos(this.angle2), Math.sin(this.angle2), j/this.stacks);
			this.vertices.push(Math.cos(this.angle2), Math.sin(this.angle2), (j+1)/this.stacks);
			this.normals.push(Math.cos(this.angle2), Math.sin(this.angle2), 0);
			this.normals.push(Math.cos(this.angle2), Math.sin(this.angle2), 0);
			this.angle2 = this.angle2 + this.angle;
			this.texCoords.push(i/this.slices,j/this.stacks);
			this.texCoords.push(i/this.slices,(j+1)/this.stacks);
		}

		for(var i = 0; i < this.slices * 2; i=i+2)
		{
			if (i != this.slices*2 - 2)
			{
				this.indices.push(n, n+2, n+1);
				this.indices.push(n+3, n+1, n+2);
			}
			else
			{
				this.indices.push(n-this.slices*2+3, n, n-this.slices*2+2);
				this.indices.push(n, n-this.slices*2+3, n+1);
			}
			n+=2;
		}
		if(j == 0)
			d = n;
		}
		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
