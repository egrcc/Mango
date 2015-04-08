

var isExist = false;
var currentFileName;
var isSaved = true;

function initMenu(){
	var win = global.gui.Window.get();
	var menubar = new global.gui.Menu({ type: 'menubar' });
	// var editor = require("./editor.js");
	var fileMenu = new global.gui.Menu();
	fileMenu.append(new global.gui.MenuItem({
		label: 'New',
		click: function() {
			isExist = false;
			loadText("");
		}
	}));
	fileMenu.append(new global.gui.MenuItem({
		label: 'Open',
		click: function() {
			save();
			chooseFile("#openFileDialog", function(filename){
				loadFile(filename);
				isSaved = true;
				isExist = true;
				currentFileName = filename;

			});
		}
	}));
	fileMenu.append(new global.gui.MenuItem({
		label: 'Save',
		click: save
	}));

	fileMenu.append(new global.gui.MenuItem({
		label: 'Save As...',
		click: function() {
			// global.$('#saveFileDialog').attr({"nwsaveas":"file.md"});
			chooseFile("#saveasFileDialog", function(filename){
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
		label: 'PDF',
		click: function() {
			// global.gui.App.quit();
			

			console.log("pdf");
			changeModeToViewer();
			// global.$('#saveFileDialog').attr({"nwsaveas":"file.pdf"});
			chooseFile("#pdfFileDialog", function(pdffilename){

				var fs = require('fs');
				var pdf = require('phantom-html2pdf');
				var html = global.window.document.documentElement.outerHTML;
				var options = {
								"html" : html,
								"css" :	"./js/highlight/styles/monokai_sublime_with_maxiang.css"
								// "js" : "./js/highlight/highlight.pack.js"
							  };
				console.log("pdf print");
				pdf.convert(options, function(result) {
				    result.toFile(pdffilename, function() {});
				});
			});
		}
	}));

	exportMenu.append(new global.gui.MenuItem({
		label: 'HTML',
		click: function() {
			// global.gui.App.quit();
			console.log("html");
			changeModeToViewer();
			// global.$('#saveFileDialog').attr({"nwsaveas":"file.html"});
			console.log("html2");
			chooseFile("#htmlFileDialog", function(filename){
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

	


	fileMenu.append(new global.gui.MenuItem({
		label: 'Exit',
		click: close
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

	var editMenu = new global.gui.Menu();

	editMenu.append(new global.gui.MenuItem({
		label: 'Redo',
		click: function(){

		}
	}));

	editMenu.append(new global.gui.MenuItem({
		label: 'Undo',
		click: function(){
			
		}
	}));

	var helpMenu = new global.gui.Menu();

	helpMenu.append(new global.gui.MenuItem({
		label: 'Mango Help',
		click: function(){

			var flow = require('nimble');
			flow.series([
			  function (callback) {
			    save();
			    console.log("1");
			    callback();
			  },
			  function (callback) {
			    loadFile("./doc/Mango-Help.md");
			    console.log("2");
			    callback();
			  },
			  function (callback) {
		    	isSaved = true;
				isExist = true;
				currentFileName = "./doc/Mango-Help.md";
				console.log("3");
				callback();
			  }
			]);
			
		}
	}));

	helpMenu.append(new global.gui.MenuItem({
		label: 'Markdown Syntax Help',
		click: function(){

			var flow = require('nimble');
			flow.series([
			  function (callback) {
			    save();
			    console.log("1");
			    callback();
			  },
			  function (callback) {
			    loadFile("./doc/Markdown-Syntax-Help.md");
			    console.log("2");
			    callback();
			  },
			  function (callback) {
		    	isSaved = true;
				isExist = true;
				currentFileName = "./doc/Markdown-Syntax-Help.md";
				console.log("3");
				console.log(isSaved.toString());
				callback();
			  }
			]);
			// save();
			// loadFile("./doc/Markdown-Syntax-Help.md");
			// isSaved = true;
			// isExist = true;
			// currentFileName = "./doc/Markdown-Syntax-Help.md";
		}
	}));

	helpMenu.append(new global.gui.MenuItem({
		label: 'Check for Update',
		click: function(){
			bootbox.alert("You already have the latest version.", function() {
			  
			});
		}
	}));
	helpMenu.append(new global.gui.MenuItem({
		label: 'About',
		click: function(){
			html = '<html>\
					<head>\
					  <meta charset="utf-8" />\
					</head>\
					<body>\
					    <div align="center">\
					    	<br><br>\
					        <img src="./img/Mango1_128.png"/>\
					        <br><br>\
					        <p><strong>Mango Editor for Markdown</strong></p>\
					        <p>0.1.0</p>\
					        <a href="https://github.com/egrcc/Mango">Mango in github</a>\
					        <br><br> \
					        <p>Copyright &copy; 2015 egrcc. All Rights Reserved </p>\
					        <a href="mailto:zhaolujun1994@gmail.com">&lt;zhaolujun1994@gmail.com&gt;</a>\
					    </div>\
					</body>\
					</html>';
			bootbox.dialog({
			  // title: "That html",
			  message: html
			});
		}
	}));


	menubar.append(new global.gui.MenuItem({ label: 'File', submenu: fileMenu}));
	menubar.append(new global.gui.MenuItem({ label: 'Edit', submenu: editMenu}));
	menubar.append(new global.gui.MenuItem({ label: 'Export', submenu: exportMenu}));
	menubar.append(new global.gui.MenuItem({ label: 'Mode', submenu: modeMenu}));
	menubar.append(new global.gui.MenuItem({ label: 'Help', submenu: helpMenu}));
	win.menu = menubar;
	win.on("close", close);
};

function save() {
	if (isExist) {
		var fs = require('fs');
		var textEditor = global.$('#editor');
		fs.writeFile(currentFileName, textEditor.val(), function(err) {
			if(err) {
				console.log(err);
			} else {
				isSaved =true;
				console.log("The file was saved!");
			}
		}); 
	} else {
		chooseFile("#saveFileDialog", function(filename){
			var fs = require('fs');
			var textEditor = global.$('#editor');
			fs.writeFile(filename, textEditor.val(), function(err) {
				if(err) {
					console.log(err);
				} else {
					isSaved = true;
					currentFileName = filename;
					isExist = true;
					console.log("The file was saved!");
				}
			}); 
		});
	}
}

function close() {

	console.log(isSaved.toString());

	if (!isSaved) {

		bootbox.dialog({
		  message: "Do you want to save the changes you have made?",
		  // title: "Custom title",
		  buttons: {
		  	
		    success: {
		      label: "Save",
		      className: "btn-success",
		      callback: function() {
		        save();
		        global.gui.App.quit();
		      }
		    },
		    danger: {
		      label: "Don't Save",
		      className: "btn-danger",
		      callback: function() {
		        global.gui.App.quit();
		      }
		    },
		    main: {
		      label: "Cancel",
		      className: "btn-primary",
		      callback: function() {
		        
		      }
		    }
		    
		  }
		});

		
	} else {
		global.gui.App.quit();
	}	
}


function changeModeToViewer() {
	var Editor = global.$('.md_editor');
	var Viewer = global.$('.md_result');
	Viewer.css({"width":"99%",
				"float":"right",
				"display":"inline"});
	Editor.css({"display":"none"});
	global.$('.background').css({"background-color":"#ffffff"});
}