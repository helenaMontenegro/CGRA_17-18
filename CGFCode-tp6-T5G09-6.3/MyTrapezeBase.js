class MyTrapezeBase  extends CGFobject{
    

constructor(scene, minS, maxS, minT, maxT, dif_x, front) {
    super(scene);

    this.minS = minS;
    this.maxS = maxS;
    this.minT = minT;
    this.maxT = maxT;
	this.dif_x = dif_x;
	this.front = front;

    this.initBuffers();
};


initBuffers()
	{
    this.vertices = [
        0, 0, 0,
        0, 1, 0,
        1, 1, 0,
        1+this.dif_x,0,0
    ];

    this.indices = [];

	var n = -1;
    if(this.front == 1)
    	n = 1;

    this.normals = [
        0, 0, n,
        0, 0, n,
        0, 0, n,
        0, 0, n
    ];

    this.texCoords = [
   		this.minS, this.maxT,
    	this.minS, this.minT,
		this.maxS, this.maxT,
		this.maxS, this.minT
    ];

    if(this.front == 1)
    {
    	this.indices.push(0,2,1);
    	this.indices.push(0,3,2);
    }
    else
    {
    	this.indices.push(0,1,2);
    	this.indices.push(0,2,3);
    }
	

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
	};
};