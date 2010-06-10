/**
	Cube [class]
		- A temporary class to generate a 3D cube using webkit CSS Transforms and some divs
		- It also instantiates the CSSAnimation class and generates a couple dynamic animations, based on the browser window size
*/
var Cube = new Class({

	faces:[],

	initialize:function(){
		this.body = $(document.body);
		this.window = $(window);

		this.getSize();

		this.template = new Element('div',{
			'class':'Template cube',
			styles:{
				width:this.windowInfo.x,
				height:this.windowInfo.y,
				webkitTransform:'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(0)'
			}
		}).inject(this.body);

		this.faces[0] = this.createFace('one');
		this.faces[1] = this.createFace('two');
		this.faces[2] = this.createFace('three');
		this.faces[3] = this.createFace('four');

		this.addAnimations();
	},

	addAnimations:function(){
		this.animation = new Fx.AnimateEl(this.template);

		this.animation.addAnimation('rotateOne',{
			duration:'1000ms',
			easing:'ease-in-out',
			iteration:1,
			onStart:(function(){
				this.template.setStyle('webkitTransform','translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(-90deg)');
			}).bind(this),
			keyframes:{
				'0':{ '-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(0deg)' },
				'25':{ '-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY(0deg)' },
				'75':{ '-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY(-90deg)' },
				'100':{ '-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(-90deg)' }
			}
		});

		this.animation.addAnimation('rotateTwo',{
			duration:'1000ms',
			easing:'ease-in-out',
			iteration:1,
			onStart:(function(){
				this.template.setStyle('webkitTransform','translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(-180deg)');
			}).bind(this),
			keyframes:{
				'0':{ '-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(-90deg)' },
				'25':{ '-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY(-90deg)' },
				'75':{ '-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY(-180deg)' },
				'100':{ '-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(-180deg)' }
			}
		});

		this.animation.addAnimation('rotateThree',{
			duration:'1000ms',
			easing:'ease-in-out',
			iteration:1,
			onStart:(function(){
				this.template.setStyle('webkitTransform','translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(-270deg)');
			}).bind(this),
			keyframes:{
				'0':{ '-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(-180deg)' },
				'25':{ '-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY(-180deg)' },
				'75':{ '-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY(-270deg)' },
				'100':{ '-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(-270deg)' }
			}
		});

		this.animation.addAnimation('rotateFour',{
			duration:'1000ms',
			easing:'ease-in-out',
			iteration:1,
			onStart:(function(){
				this.template.setStyle('webkitTransform','translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(0deg)');
			}).bind(this),
			keyframes:{
				'0':{ '-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(-270deg)' },
				'25':{ '-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY(-270deg)' },
				'75':{ '-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY(-360deg)' },
				'100':{ '-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(-360deg)' }
			}
		});
	},

	createFace:function(num){
		return new Element('div',{
			'class':'face '+num,
			html:'<h1>This is face '+num+' <small>click to advance</small></h1>',
			styles:{
				width:this.windowInfo.x,
				height:this.windowInfo.y,
				webkitTransformOrigin:'50% 50% 0',
				webkitTransform:this.determineTransforms(num)
			},
			events:{
				click:this.changeFace.bindWithEvent(this,num)
			}
		}).inject(this.template);
	},

	determineTransforms:function(num){
		var transforms = '';

		switch(num){
			case 'one':
				transforms = 'translate3d(0,0,'+this.windowInfo.halfX+'px) rotateY(0deg)';
				break;
			case 'two':
				transforms = 'translate3d('+this.windowInfo.halfX+'px,0,0) rotateY(90deg)';
				break;
			case 'three':
				transforms = 'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(180deg)';
				break;
			case 'four':
				transforms = 'translate3d('+-this.windowInfo.halfX+'px,0,0) rotateY(270deg)';
				break;
		};

		return transforms;
	},

	getSize:function(){
		this.windowInfo = {};

		this.windowInfo = this.window.getSize();

		this.windowInfo.halfX = this.windowInfo.x/2;
		this.windowInfo.halfY = this.windowInfo.y/2;
	},

	changeFace:function(e,val){
		if(e && e.stop) e.stop();
		if(this.animation.animating===true) return;
		if(val==='one')
			this.animation.start('rotateOne');
		if(val==='two')
			this.animation.start('rotateTwo');
		if(val==='three')
			this.animation.start('rotateThree');
		if(val==='four')
			this.animation.start('rotateFour');
	}
});