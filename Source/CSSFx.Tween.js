/*
---

name: CSSFx.Tween

description: Nearly identical to Fx.Tween, except animations use CSS Transitions instead

license: MIT-style license.

provides: CSSFx.Tween

...
*/

CSSFx.Tween = new Class({
	Extends: CSSFx,

	Implements:[CSSFx.CSS,CSSFx.Transitions,CSSFx.CubicBezier],

	initialize:function(element,options){
		this.element = this.subject = document.id(element);

		this.transitionStart = this.transitionStart.bindWithEvent(this);
		this.transitionEnd = this.transitionEnd.bindWithEvent(this);

		this.resume = this.resume.bindWithEvent(this);
		this.resumeDelay = this.resumeDelay.bind(this);

		this.parent(options);
	},

	start:function(property, from, to){
		var args = $A(arguments), setStart = false;

		if (!this.check(property, from, to)) return this;

		this.property = this.options.property || args.shift();

		if(args.length===1) {
			args.splice(0,0,this.element.getComputedStyle(this.validateProperty(this.property)));
		}
		else setStart = true;

		this.parent(args[0],args[1]);

		if(setStart==true) {
			this.element.setStyle(this.property,this.from);
		}

		this.transitionStart.delay(1);
	},

	cancel:function(){
		var property = this.validateProperty(this.property);
		var value = this.element.getComputedStyle(property);

		this.transitionClean();

		this.element.setStyle(this.property,value);

		this.parent(value);
	},

	pause:function(){
		if(this.running===false) return;
		var property = this.validateProperty(this.property);
		var value = this.element.getComputedStyle(property);

		this.element.setStyle(this.property,value);

		this.transitionClean();

		this.parent(value);
	},

	resume:function(){
		if(!this.state || this.running===true) return this;
		
		this.element.setStyle('webkitTransition',this.transitionProperty(this.state));
		console.log(this.transitionProperty(this.state));
		
		this.resumeDelay.delay(1);
		
		this.parent();
	},

	resumeDelay:function(){
		this.element
			.addEvent('transitionEnd',this.transitionEnd)
			.setStyle(this.property,this.to);
		
		delete this.state;
	},

	transitionStart:function(){
		this.element
			.addEvent('transitionEnd',this.transitionEnd)
			.setStyle('webkitTransition',this.transitionProperty());

		this.element.setStyle(this.property,this.to);
	},

	transitionEnd:function(){
		this.transitionClean();

		this.onComplete();
	},

	transitionClean:function(){
		this.element
			.removeEvent('transitionEnd',this.transitionEnd)
			.setStyle('webkitTransition','none');
	},

	transitionProperty:function(state){
		var property = this.validateProperty(this.property), duration, transitionString;

		if(state){
			var duration = this.state.duration+'ms';

			transitionString = this.getTransitionString(this.state.cubicBezier);
		}
		else {
			duration = this.options.duration;
			if($type(duration)==='number') duration+='ms';

			transitionString = this.options.transitionString;
		}
		
		return ''+property+' '+duration+' '+transitionString;
	}
});