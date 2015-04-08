

function init(){
	// var menu = require("./js/menu.js");
	initMenu();

	global.$(global.window.document).ready(function(){
		// var editor = require("./js/editor.js");
		if(global.gui.App.argv.length > 0){
			loadFile(global.gui.App.argv[0]);
		}
		var textEditor = global.$('#editor');
		textEditor.bind('input propertychange', function() {
			reload();
		});
		tabOverride.set(global.window.document.getElementsByTagName('textarea'));
	});
}