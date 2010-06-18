var CSSFx = new Class({
	Implements:[Chain, Options, Events],

	options:{
		link:'ignore',
		duration:500,
		transition:'sine:in:out'
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
	},

	set:function(){
		return this;
	},

	start:function(from, to){
		this.from = from;

		this.to = to;

		this.onStart();

		return this;
	},

	cancel:function(){
		this.onCancel();

		return this;
	},

	pause:function(){
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
		this.fireEvent('cancel',this.subject);
	},
	
	onPause:function(){
		this.fireEvent('pause',this.subject);
	},
	
	onResume:function(){
		this.fireEvent('resume',this.subject);
	},

	onComplete:function(){
		this.fireEvent('complete',this.subject);

		if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
	}
});