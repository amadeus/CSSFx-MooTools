CSSFx.CubicBezier = new Class({
	interpolatePoint:function(u, p0, p1){
		return [((1-u)*p0[0]) + (u*p1[0]), ((1-u)*p0[1]) + (u*p1[1])];
	},

	calculateCubicBezier:function(u,tVals){
		var a0, a1, a2, a3, b1, b2, b3, c1, c2, a12, xRange, yRange;

		a0 = [0,0];
		a1 = [tVals[0], tVals[1]];
		a2 = [tVals[2], tVals[3]];
		a3 = [1,1];

		b1  = this.interpolatePoint(u, a0,  a1);
		a12 = this.interpolatePoint(u, a1,  a2);
		b2  = this.interpolatePoint(u, b1,  a12);
		c2  = this.interpolatePoint(u, a2,  a3);
		c1  = this.interpolatePoint(u, a12, c2);
		b3  = this.interpolatePoint(u, b2,  c1);

		xRange = a3[0] - b3[0];
		yRange = a3[1] - b3[1];

		return [
			Math.max((c1[0] - b3[0]) / xRange,0),
			Math.max((c1[1] - b3[1]) / yRange,0),
			Math.max((c2[0] - b3[0]) / xRange,0),
			Math.max((c2[1] - b3[1]) / yRange)
		];
	},
	
	determinePercentage:function(from,to,paused){
		return (this.paused-this.from) / (this.to-this.from);
	}
});