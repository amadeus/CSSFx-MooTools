/*
---

name: CSSFx.Transitions

description: Converts between MooTools transitions and Webkit CSS transition methods

license: MIT-style license.

provides: CSSFx.Transitions

...
*/

CSSFx.Transitions = new Class({
	getTransition:function(string){
		if(this.transitionHash[string])
			return this.transitionHash[string];

		return string;
	},

	getTransitionString:function(){
		var value, stringStart='cubic-bezier(', stringEnd=')';

		if($type(arguments[0])==='array')
			return stringStart+arguments[0].toString()+stringEnd;

		value = this.testTransitionHash(arguments[0]);

		if(value===false) return arguments[0];

		return stringStart+value+stringEnd;
	},

	testTransitionHash:function(string){
		if(this.transitionHash[string])
			return this.transitionHash[string];
		return false;
	},

	transitionHash:{
		'linear:in':[0,0,1,1],
		'linear:out':[0,0,1,1],
		'linear:in:out':[0,0,1,1],
		'expo:in':[0.71,0.01,0.83,0],
		'expo:out':[0.14,1,0.32,0.99],
		'expo:in:out':[0.85,0,0.15,1],
		'circ:in':[0.34,0,0.96,0.23],
		'circ:out':[0,0.5,0.37,0.98],
		'circ:in:out':[0.88,0.1,0.12,0.9],
		'sine:in':[0.22,0.04,0.36,0],
		'sine:out':[0.04,0,0.5,1],
		'sine:in:out':[0.37,0.01,0.63,1],
		'quad:in':[0.14,0.01,0.49,0],
		'quad:out':[0.01,0,0.43,1],
		'quad:in:out':[0.47,0.04,0.53,0.96],
		'cubic:in':[0.35,0,0.65,0],
		'cubic:out':[0.09,0.25,0.24,1],
		'cubic:in:out':[0.66,0,0.34,1],
		'quart:in':[0.69,0,0.76,0.17],
		'quart:out':[0.26,0.96,0.44,1],
		'quart:in:out':[0.76,0,0.24,1],
		'quint:in':[0.64,0,0.78,0],
		'quint:out':[0.22,1,0.35,1],
		'quint:in:out':[0.9,0,0.1,1]
	}
});