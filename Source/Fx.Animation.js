/**
	Fx.Animation [class]
		- A class to generate and store css animations and events
		- Only tested in Safari 5, iPad and iPhone
*/
Fx.Animation = new Class({
	Implements:[Options,Events],

	options:{
		duration:1000,
		iteration:1,
		easing:'linear',
		keyframes:{}
		/*
			Keyframe API:
			keyframes:{
				precentage(number as string):properties(string),
				precentage(number as string):properties(string)
			}

			Events:
			onStart:(function),
			onIteration:(function),
			onComplete:(function),
			onCancel:(function)
		*/
	},

	animating:false,

	initialize:function(name,options){
		this.setOptions(options);

		this.name = name;
		
		this.duration = this.duration.bind(this);
		this.duration();
		
		return this;
	},
	
	duration:function(){
		if($type(this.options.duration)==='number')
			this.options.duration+='ms';
		return this.options.duration;
	},

	animationString:function(forceGenerate){
		if(!this.options.animationString || forceGenerate===true){
			this.options.animationString = ''+this.name;
			this.options.animationString += ' '+this.duration();
			this.options.animationString += ' '+this.options.iteration;
			this.options.animationString += ' '+((this.options.easing) ? this.options.easing : 'linear');
		}

		return this.options.animationString;
	},

	keyframes:function(forceGenerate){
		if(!this.options.keyframeString || forceGenerate===true) {
			this.options.keyframeString = '@-webkit-keyframes '+this.name+' {';

			$each(this.options.keyframes,function(obj,index){
				this.options.keyframeString+=index+'% {';

				$each(obj,function(value,key){
					this.options.keyframeString+=key+':'+value+';';
				},this);

				this.options.keyframeString+='}';
			},this);

			this.options.keyframeString+='}';
		}

		return this.options.keyframeString;
	}
});