/**
	Cube [class]
		- A temporary class to generate a 3D cube using webkit CSS Transforms and some divs
		- It also instantiates the Fx.AnimateEl class and generates a couple dynamic animations, based on the browser window size and purpose
*/
var Cube = new Class({

	faces:[],

	initialize:function(){
		this.body = $(document.body);
		this.window = $(window);
		this.position = 'one';

		this.returnHome = this.returnHome.bindWithEvent(this);

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
		this.animation = new CSSFx.AnimateEl(this.template);

		this.animation.addAnimation('returnHome',{
			duration:1000,
			easing:'ease-in-out',
			iteration:1,
			onStart:(function(){ this.template.setStyle('webkitTransform','translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(0deg)'); }).bind(this)
		});

		this.animation.addAnimation('gotoFace',{
			duration:1000,
			easing:'ease-in-out',
			iteration:1
		});
	},

	createFace:function(num){
		var face = new Element('div',{
			'class':'face '+num,
			styles:{
				width:this.windowInfo.x,
				height:this.windowInfo.y,
				webkitTransformOrigin:'50% 50% 0',
				webkitTransform:this.determineTransforms(num)
			}
		}).inject(this.template);

		new Element('h1',{
			html:'This is face '+num+' <small>click to advance</small></h1>',
			events:{ click:this.cycleFace.bindWithEvent(this,num) }
		}).inject(face);

		if(num!=='one'){
			new Element('div',{
				'class':'return-home',
				text:'Return Home',
				events:{ click:this.returnHome }
			}).inject(face);
		}
		else {
			var gotoContainer = new Element('div',{
				'class':'goto-face',
				text:'Go To Face: '
			}).inject(face);

			new Element('span',{
				text:'Two',
				events:{
					click:this.gotoFace.bindWithEvent(this,'two')
				}
			}).inject(gotoContainer);

			new Element('span',{
				text:'Three',
				events:{
					click:this.gotoFace.bindWithEvent(this,'three')
				}
			}).inject(gotoContainer);

			new Element('span',{
				text:'Four',
				events:{
					click:this.gotoFace.bindWithEvent(this,'four')
				}
			}).inject(gotoContainer);
		}

		return face;
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

	cycleFace:function(e,to){
		if(e && e.stop) e.stop();
		if(this.animation.animating===true) return;

		switch(to){
			case 'one':
				to = 'two';
				break;
			case 'two':
				to = 'three';
				break;
			case 'three':
				to = 'four';
				break;
			case 'four':
				to = 'one';
				break;
		}

		this.gotoFace(null,to);
	},

	returnHome:function(e){
		if(e && e.stop) e.stop();

		var from = this.position;

		switch(from){
			case 'two':
				from = '-90deg';
				break;
			case 'three':
				from = '-180deg';
				break;
			case 'four':
				from = '-270deg';
				break;
		}

		this.position = 'one';

		this.animation.updateAnimation('returnHome',{
			keyframes:{

				'0':{
					'-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY('+from+')'
				},

				'25':{
					'-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY('+from+')'
				},

				'75':{
					'-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY(0deg)'
				},

				'100':{
					'-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY(0deg)'
				}
			}
		}).start('returnHome');
	},

	gotoFace:function(e,to,from){
		if(e && e.stop);

		if(!from) from = this.position;

		this.position = to;

		switch(from){
			case 'one':
				from = '0deg';
				break;
			case 'two':
				from = '-90deg';
				break;
			case 'three':
				from = '-180deg';
				break;
			case 'four':
				from = '-270deg';
				break;
			default:
				from = '0deg';
				break;
		}

		switch(to){
			case 'two':
				to = '-90deg';
				break;
			case 'three':
				to = '-180deg';
				break;
			case 'four':
				to = '-270deg';
				break;
			case 'one':
				to = '-360deg';
				break;
		}

		this.animation.updateAnimation('gotoFace',{
			keyframes:{

				'0':{
					'-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY('+from+')'
				},

				'25':{
					'-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY('+from+')'
				},

				'75':{
					'-webkit-transform':'translate3d(0,0,'+-(this.windowInfo.halfX+500)+'px) rotateY('+to+')'
				},

				'100':{
					'-webkit-transform':'translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY('+to+')'
				}
			}
		});

		var onStart = (function(){
			this.template.setStyle('webkitTransform','translate3d(0,0,'+-this.windowInfo.halfX+'px) rotateY('+to+')');
		}).bind(this);

		this.animation.removeEvents('gotoFace','start');

		this.animation.addEvent('gotoFace','start',onStart);

		this.animation.start('gotoFace');
	}
});