/*
---

name: CSSFx.AnimateEl

description: Base class for storing and executing CSS animations on an html object. Will be renamed.

license: MIT-style license.

provides: CSSFx.AnimateEl

...
*/

CSSFx.AnimateEl = new Class({
	Implements:Options,

	options:{ chain:'ignore' }, // Chaining has not yet been implemented...

	Animations:{},

	animationStatus:{

		running:false,

		name:null
	},

	initialize:function(el){
		this.addNativeAnimationEvents.apply(window);

		// Add new stylesheet for keyframe rules
		new Element('style',{ type:'text/css' }).inject($$('head')[0]);

		this.stylesheet = document.styleSheets[document.styleSheets.length-1];

		// Prebind all major methods
		this.addAnimation = this.addAnimation.bind(this);
		this.removeAnimation = this.removeAnimation.bind(this);
		this.start = this.start.bind(this);
		this.cancel = this.cancel.bind(this);
		this.addEvent = this.addEvent.bind(this);
		this.addEvents = this.addEvents.bind(this);
		this.removeEvent = this.removeEvent.bind(this);
		this.removeEvents = this.removeEvents.bind(this);
		this.animationStart = this.animationStart.bindWithEvent(this);
		this.animationIteration = this.animationIteration.bindWithEvent(this);
		this.animationEnd = this.animationEnd.bindWithEvent(this);

		this.el = $(el).addEvents({

			animationStart:this.animationStart,

			animationIteration:this.animationIteration,

			animationEnd:this.animationEnd
		});

		return this;
	},

	start:function(animation){
		if(!this.Animations[animation]) return false;

		this.el.setStyle('webkitAnimation',this.Animations[animation].animationString());

		return this;
	},

	cancel:function(){
		if(this.animationStatus.running===false) return this;

		this.animationStatus.running = false;

		this.el.setStyle('webkitAnimation','');

		return this;
	},

	animationStart:function(event){
		if(!this.Animations[event.event.animationName]) return;

		this.animationStatus.running = true;

		this.animationStatus.name = event.event.animationName;

		return this.Animations[event.event.animationName].fireEvent('start',event);
	},

	animationIteration:function(event){
		if(!this.Animations[event.event.animationName]) return;

		return this.Animations[event.event.animationName].fireEvent('iteration',event);
	},

	animationEnd:function(event){
		if(!this.Animations[event.event.animationName]) return;

		this.animationStatus.running = false;
		this.el.setStyle('webkitAnimation','');

		return this.Animations[event.event.animationName].fireEvent('complete',event);
	},

	addEvent:function(anim,type,func){
		if(!this.Animations[anim]) return false;

		this.Animations[anim].addEvent(type,func);

		return this;
	},

	addEvents:function(anim,obj){
		if(!this.Animations[anim]) return false;

		this.Animations[anim].addEvents(obj);

		return this;
	},

	removeEvent:function(anim,type,func){
		if(!this.Animations[anim]) return false;

		this.Animations[anim].removeEvent(type,func);

		return this;
	},

	removeEvents:function(anim,obj){
		if(!this.Animations[anim]) return false;

		this.Animations[anim].removeEvents(obj);

		return this;
	},

	addAnimation:function(name,anim){
		if(this.Animations[name]) return false;

		anim.ruleIndex = this.stylesheet.cssRules.length;

		this.Animations[name] = new CSSFx.Animation(name,anim);

		this.stylesheet.insertRule(this.Animations[name].keyframes(),anim.ruleIndex);

		return this;
	},

	updateAnimation:function(name,anim){
		if(!this.Animations[name])
			return this.addAnimation(name,anim);

		var index = this.Animations[name].options.ruleIndex;

		this.stylesheet.deleteRule(index);

		this.Animations[name].setOptions(anim);

		this.Animations[name].animationString(true);

		this.Animations[name].keyframes(true);

		this.stylesheet.insertRule(this.Animations[name].keyframes(),index);

		return this;
	},

	removeAnimation:function(anim){
		if(!this.Animations[anim]) return false;

		this.Animations[anim].removeEvents();

		this.stylesheet.deleteRule(this.Animations[anim].options.ruleIndex);

		delete this.Animations[anim];

		return this;
	},

	addNativeAnimationEvents:function(){
		if(
			Element.NativeEvents.animationStart &&
			Element.NativeEvents.animationIteration &&
			Element.NativeEvents.animationEnd
		) return;

		Element.NativeEvents.animationStart = 2;
		Element.NativeEvents.animationIteration = 2;
		Element.NativeEvents.animationEnd = 2;

		Element.NativeEvents.webkitAnimationStart = 2;
		Element.NativeEvents.webkitAnimationIteration = 2;
		Element.NativeEvents.webkitAnimationEnd = 2;

		Element.Events.set('animationStart', { base:'webkitAnimationStart' });
		Element.Events.set('animationIteration', { base:'webkitAnimationIteration' });
		Element.Events.set('animationEnd', { base:'webkitAnimationEnd' });
	}
});