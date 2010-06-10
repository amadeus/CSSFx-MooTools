/**
	CSSAnimations [class]
		- A class to generate and execute CSS Animations
		- Only tested in Safari 5, iPad and iPhone
*/
var CSSAnimations = new Class({
	Implements:[Options,Events], // Not sure hot to fully use events in this case. Perhaps create a sub class for an individual animation

	options:{}, // Not sure what types of options I would like to implement yet...

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

		new Element('style',{ type:'text/css' }).inject($$('head')[0]);

		this.stylesheet = document.styleSheets[document.styleSheets.length-1];

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

		if(this.Animations[event.event.animationName].onStart)
			this.Animations[event.event.animationName].onStart();
	},
	/* Have to perform further testing
	animIteration:function(){

	},
	*/
	animationEnd:function(event){
		this.animating = false;

		if(this.Animations[event.event.animationName].onComplete)
			this.Animations[event.event.animationName].onComplete();
	},

	Animations:{},

	/*{ animObj Reference
		duration:(string),
		iteration:(string),
		keyframes:{
			precentage(number as string):properties(string),
			precentage(number as string):properties(string)
		},
		easing:(string),
		onStart:(function),
		onIterate:(function), // Not implemented
		onComplete:(function)
	}*/
	addAnimation:function(name,anim){ // TODO: Remove $merge and test for or provide better data
		if(this.Animations[name]) return false;

		this.Animations[name] = $merge(anim);

		this.Animations[name].string = this.generateKeyframes(name,this.Animations[name].keyframes);

		this.Animations[name].shortcut = this.generateShortcut(name);

		this.Animations[name].ruleIndex = this.stylesheet.cssRules.length;

		this.stylesheet.insertRule(this.Animations[name].string,this.Animations[name].ruleIndex);
	},

	generateShortcut:function(name){
		var shortcut = ''+name;

		shortcut += ' '+this.Animations[name].duration;
		shortcut += ' '+this.Animations[name].iteration;
		shortcut += ' '+((this.Animations[name].easing) ? this.Animations[name].easing : 'linear');

		return shortcut;
	},

	generateKeyframes:function(name,keyframes){
		var keyframeString = '@-webkit-keyframes '+name+' {';

		$each(keyframes,function(obj,index){
			keyframeString+=index+'% {';

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

		this.stylesheet.deleteRule(this.Animations[key].ruleIndex);
		delete this.Animations[key];

		return true;
	}
});