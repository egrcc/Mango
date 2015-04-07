// exports.initMenu = function(){
// 	var win = global.gui.Window.get();
// 	var menubar = new global.gui.Menu({ type: 'menubar' });
// 	var editor = require("./editor.js");
// 	var fileMenu = new global.gui.Menu();
// 	fileMenu.append(new global.gui.MenuItem({
// 		label: 'New',
// 		click: function() {
// 			editor.loadText("");
// 		}
// 	}));
// 	fileMenu.append(new global.gui.MenuItem({
// 		label: 'Open',
// 		click: function() {
// 			editor.chooseFile("#openFileDialog", function(filename){
// 				editor.loadFile(filename);
// 			});
// 		}
// 	}));
// 	fileMenu.append(new global.gui.MenuItem({
// 		label: 'Save',
// 		click: function() {
// 			editor.chooseFile("#saveFileDialog", function(filename){
// 				var fs = require('fs');
// 				var textEditor = global.$('#editor');
// 				fs.writeFile(filename, textEditor.val(), function(err) {
// 					if(err) {
// 						console.log(err);
// 					} else {
// 						console.log("The file was saved!");
// 					}
// 				}); 
// 			});
// 		}
// 	}));
// 	fileMenu.append(new global.gui.MenuItem({
// 		label: 'Exit',
// 		click: function() {
// 			global.gui.App.quit();
// 		}
// 	}));

// 	menubar.append(new global.gui.MenuItem({ label: 'File', submenu: fileMenu}));
// 	win.menu = menubar;
// };

function initMenu(){
	var win = global.gui.Window.get();
	var menubar = new global.gui.Menu({ type: 'menubar' });
	// var editor = require("./editor.js");
	var fileMenu = new global.gui.Menu();
	fileMenu.append(new global.gui.MenuItem({
		label: 'New',
		click: function() {
			loadText("");
		}
	}));
	fileMenu.append(new global.gui.MenuItem({
		label: 'Open',
		click: function() {
			chooseFile("#openFileDialog", function(filename){
				loadFile(filename);
			});
		}
	}));
	fileMenu.append(new global.gui.MenuItem({
		label: 'Save',
		click: function() {
			chooseFile("#saveFileDialog", function(filename){
				var fs = require('fs');
				var textEditor = global.$('#editor');
				// fs.writeFile(filename, textEditor.val(), function(err) {
				// 	if(err) {
				// 		console.log(err);
				// 	} else {
				// 		console.log("The file was saved!");
				// 	}
				// }); 
				fs.writeFile(filename, global.$('html').html(), function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("The file was saved!");
					}
				}); 
			});
		}
	}));
	fileMenu.append(new global.gui.MenuItem({
		label: 'Exit',
		click: function() {
			global.gui.App.quit();
		}
	}));

	menubar.append(new global.gui.MenuItem({ label: 'File', submenu: fileMenu}));
	win.menu = menubar;
};