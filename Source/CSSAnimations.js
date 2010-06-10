/**
	CSSAnimations [class]
		- A class to generate and execute CSS Animations
		- Only tested in Safari 5 and iPhone. Seems broken on iPad Safari, for some reason
*/
var CSSAnimations = new Class({
	Implements:Options,
	options:{},
	initialize:function(el){
		(function(){
			if(Element.NativeEvents.animationEnd) return;
			Element.NativeEvents.animationEnd = 2;
			Element.NativeEvents.webkitAnimationEnd = 2;
			Element.NativeEvents.webkitAnimationStart = 2;

			Element.Events.set('animationEnd', { base:'webkitAnimationEnd' });
			Element.Events.set('animationStart', { base:'webkitAnimationStart' });
		}).apply(window);

		this.body = $(document.body);
		this.head = $$('head')[0];

		this.addAnimation = this.addAnimation.bind(this);
		this.removeAnimation = this.removeAnimation.bind(this);
		this.start = this.start.bind(this);
		this.animationStart = this.animationStart.bindWithEvent(this);
		this.animationEnd = this.animationEnd.bindWithEvent(this);

		this.el = $(el).addEvents({
			animationStart:this.animationStart,
			animationEnd:this.animationEnd
		});


	},

	start:function(animation){
		if(!this.Animations[animation]) return false;
		this.el.setStyle('webkitAnimation',this.Animations[animation].shortcut);
	},

	animationStart:function(event){
		this.animating = true;
	},
	/*
	animIteration:function(){

	},
	*/
	animationEnd:function(event){
		this.animating = false;
		if(this.Animations[event.event.animationName].onComplete)
			this.Animations[event.event.animationName].onComplete();
	},

	Animations:{},

	/*{ API Reference
		name:(string),
		duration:(string),
		iteration:(string),
		keyframes:{
			precentage(string):properties(string),
			precentage(string):properties(string)
		},
		easing:(string),
		onStart:(function),
		onIterate:(function), // Not implemented
		onComplete:(function)
	}*/
	addAnimation:function(anim){
		var name = anim.name;
		if(this.Animations[name]) return false;

		delete anim.name;

		this.Animations[name] = $merge(anim);

		this.Animations[name].string = this.generateKeyframes(name,this.Animations[name].keyframes);

		this.Animations[name].shortcut = this.generateShortcut(name);

		this.Animations[name].stylesheet = new Element('style',{
			type:'text/css',
			html:this.Animations[name].string
		}).inject(this.head);
	},

	generateShortcut:function(name){
		var shortcut = ''+name;

		shortcut += ' '+this.Animations[name].duration;
		shortcut += ' '+this.Animations[name].iteration;
		shortcut += ' '+this.Animations[name].easing;

		return shortcut;
	},

	generateKeyframes:function(name,keyframes){
		var keyframeString = '@-webkit-keyframes '+name+' {';

		$each(keyframes,function(obj,index){
			keyframeString+=index+'%{';
			$each(obj,function(value,key){
				keyframeString+=key+':'+value+';';
			},this);
			keyframeString+='}';
		},this);

		keyframeString+='}';

		return keyframeString;
	},

	removeAnimation:function(key){
		if(!this.Animations[key]) return false;

		this.Animations[key].stylesheet.destroy();
		delete this.Animations[key];

		return true;
	}
});