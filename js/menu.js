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
			global.$('#saveFileDialog').attr({"nwsaveas":"file.md"});
			chooseFile("#saveFileDialog", function(filename){
				var fs = require('fs');
				var textEditor = global.$('#editor');
				fs.writeFile(filename, textEditor.val(), function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("The file was saved!");
					}
				}); 
				// fs.writeFile(filename, global.$('html').html(), function(err) {
				// 	if(err) {
				// 		console.log(err);
				// 	} else {
				// 		console.log("The file was saved!");
				// 	}
				// }); 
			});
		}
	}));

	var exportMenu = new global.gui.Menu();

	exportMenu.append(new global.gui.MenuItem({
		label: 'HTML',
		click: function() {
			// global.gui.App.quit();
			console.log("html");
			changeModeToViewer();
			global.$('#saveFileDialog').attr({"nwsaveas":"file.html"});
			chooseFile("#saveFileDialog", function(filename){
				console.log("html print");
				var fs = require('fs');
				fs.writeFile(filename, global.window.document.documentElement.outerHTML, function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("The file was saved!");
					}
				}); 
			});

		}
	}));

	exportMenu.append(new global.gui.MenuItem({
		label: 'PDF',
		click: function() {
			// global.gui.App.quit();
			

			console.log("pdf");
			changeModeToViewer();
			global.$('#saveFileDialog').attr({"nwsaveas":"file.pdf"});
			chooseFile("#saveFileDialog", function(pdffilename){

				var fs = require('fs');
				var pdf = require('phantom-html2pdf');
				var options = {
								"html" : "./file.html",
								"css" :	"./css/maxiang.css",
								"js" : "./js/highlight/highlight.pack.js"
							  };
				console.log("pdf print");
				pdf.convert(options, function(result) {
				    result.toFile(pdffilename, function() {});
				});
			});
		}
	}));

	fileMenu.append(new global.gui.MenuItem({
		label: 'Export...',
		submenu: exportMenu
	}));

	fileMenu.append(new global.gui.MenuItem({
		label: 'Exit',
		click: function() {
			global.gui.App.quit();
		}
	}));

	var modeMenu = new global.gui.Menu();

	modeMenu.append(new global.gui.MenuItem({
		label: 'Editor:Viewer',
		click: function() {
			// global.gui.App.quit();
			var Editor = global.$('.md_editor');
			var Viewer = global.$('.md_result');
			Editor.css({"float":"left",
						"display":"inline",
						"width":"49.8%",
						"margin-left":"5px"});
			Viewer.css({"float":"right",
						"display":"inline",
						"width":"49.5%",
						"margin-left":"0px"});
			global.$('.background').css({"background-color":"#ffffff"});
		}
	}));
	modeMenu.append(new global.gui.MenuItem({
		label: 'Viewer:Editor',
		click: function() {
			// global.gui.App.quit();
			var Editor = global.$('.md_editor');
			var Viewer = global.$('.md_result');
			Editor.css({"float":"right",
						"display":"inline",
						"width":"49.8%",
						"margin-left":"0px"});
			Viewer.css({"float":"left",
						"display":"inline",
						"width":"50.2%",
						"margin-left":"0px"});
			global.$('.background').css({"background-color":"#272822"});
		}
	}));
	modeMenu.append(new global.gui.MenuItem({
		label: 'Editor',
		click: function() {
			// global.gui.App.quit();
			var Editor = global.$('.md_editor');
			var Viewer = global.$('.md_result');
			Editor.css({"width":"99.5%",
						"float":"right",
						"display":"inline",
						"margin-left":"5px"});
			Viewer.css({"display":"none"});
			global.$('.background').css({"background-color":"#ffffff"});
		}
	}));
	modeMenu.append(new global.gui.MenuItem({
		label: 'Viewer',
		click: changeModeToViewer
	}));

	menubar.append(new global.gui.MenuItem({ label: 'File', submenu: fileMenu}));
	menubar.append(new global.gui.MenuItem({ label: 'Mode', submenu: modeMenu}));
	win.menu = menubar;
};

function changeModeToViewer() {
	var Editor = global.$('.md_editor');
	var Viewer = global.$('.md_result');
	Viewer.css({"width":"99%",
				"float":"right",
				"display":"inline"});
	Editor.css({"display":"none"});
	global.$('.background').css({"background-color":"#ffffff"});
}