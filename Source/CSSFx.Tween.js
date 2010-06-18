CSSFx.Tween = new Class({
	Extends: CSSFx,

	initialize:function(element,options){
		this.element = this.subject = document.id(element);

		this.parent(options);

	}
});