/*
---

name: CSSFx

description: Base class with generic events, callbacks etc, for CSSFx sub classes

license: MIT-style license.

provides: CSSFx

...
*/

var CSSFx = new Class({
	Implements:[Chain, Options, Events],

	options:{
		link:'ignore',
		duration:500,
		transition:'ease-in-out'
		/*
		Events:
			onStart:(function),
			onCancel:(function),
			onComplete:(function),
			onPause:(function),
			onResume:(function)
		*/
	},

	initialize:function(options){
		this.subject = this.subject || this;

		this.setOptions(options);

		this.onComplete = this.onComplete.bind(this);

		this.addNativeAnimationEvents();
	},

	set:function(){
		return this;
	},

	start:function(from, to){
		this.from = from;

		this.to = to;

		this.running = true;

		this.onStart();

		return this;
	},

	cancel:function(){
		this.running = false;

		this.onCancel();

		return this;
	},

	pause:function(computed){
		if(this.running===false) return;

		this.running = false;

		this.paused = parseInt(computed,10);// Current computed property of element
		this.property;						// property that is getting animated
		this.from;							// position where the animation started
		this.to;							// position where the animation should end
		this.options.duration;				// Duration of the animation, typically in milliseconds
		this.options.transitionValues;		// Array of values for the cubic bezier


		this.onPause();

		return this;
	},

	resume:function(){
		this.onResume();
		
		
		
		return this;
	},

	onStart:function(){
		this.fireEvent('start',this.subject);
	},

	onCancel:function(){
		this.fireEvent('cancel',this.subject).clearChain();;
	},

	onPause:function(){
		this.fireEvent('pause',this.subject);
	},

	onResume:function(){
		this.fireEvent('resume',this.subject);
	},

	onComplete:function(){
		this.running = false;

		this.fireEvent('complete',this.subject);

		if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
	},

	addNativeAnimationEvents:function(){
		if(
			Element.NativeEvents.transitionStart &&
			Element.NativeEvents.transitionEnd
		) return;

		Element.NativeEvents.transitionStart = 2;
		Element.NativeEvents.transitionEnd = 2;

		Element.NativeEvents.webkitTransitionStart = 2;
		Element.NativeEvents.webkitTransitionEnd = 2;

		Element.Events.set('transitionStart', { base:'webkitTransitionStart' });
		Element.Events.set('transitionEnd', { base:'webkitTransitionEnd' });
	},

	check:function(){
		if(this.running!=true) return true;

		switch (this.options.link){
			case 'cancel':
				this.cancel();
				return true;
			case 'chain':
				this.chain(this.caller.bind(this, arguments));
				return false;
		}

		return false;
	}
});