/*
---

name: CSSFx.CSS

description: Translates and interprets webkit specific CSS properties

license: MIT-style license.

provides: CSSFx.CSS

...
*/

CSSFx.CSS = new Class({
	validateProperty:function(string){
		if(this.webkitHash[string]) return this.webkitHash[string];
		else return string;
	},

	webkitHash:{
		'webkitTransform':'-webkit-transform',
		'webkitAnimation':'-webkit-animation',
		'webkitTransition':'-webkit-transition'
	}
});