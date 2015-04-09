

var isExist = false;
var currentFileName;
var isSaved = true;
var isHide = false;

var fileMenuArray = ["New                           Ctrl+N",
				     "Open                         Ctrl+O",
				     "Save                           Ctrl+S",
				     "Save As...   Shift+Ctrl+S",
				     "Quit                          Ctrl+Q"];

var editMenuArray = ["Undo                  Ctrl+Z",
				     "Redo     Shift+Ctrl+Z",
				     "Cut                      Ctrl+X",
				     "Copy                   Ctrl+C",
				     "Paste                 Ctrl+V",
				     "Delete               Ctrl+D",
				     "Select All         Ctrl+A"];

var exportMenuArray = ["PDF                      Ctrl+E",
					   "HTML    Shift+Ctrl+E"];

var modeMenuArray = ["Editor:Viewer    Shift+Ctrl+1",
					 "Viewer:Editor    Shift+Ctrl+2",
					 "Editor                     Shift+Ctrl+3",
					 "Viewer                   Shift+Ctrl+4",
					 "Hide Toolbar                   Ctrl+H",
					 "Show Toolbar    Shift+Ctrl+H",
					 "Fullscreen                                F11",
					 "Exit Fullscreen                      F12"];					   

function initMenu(){
	var win = global.gui.Window.get();
	var menubar = new global.gui.Menu({ type: 'menubar' });
	// var editor = require("./editor.js");
	var fileMenu = new global.gui.Menu();
	fileMenu.append(new global.gui.MenuItem({
		// label: 'New',
		label: fileMenuArray[0],
		click: newFile,
		key: "n",
  		modifiers: "ctrl"
	}));
	fileMenu.append(new global.gui.MenuItem({
		// label: 'Open',
		label: fileMenuArray[1],
		click: openFile,
		key: "o",
  		modifiers: "ctrl"
	}));

	fileMenu.append(new global.gui.MenuItem({
		type: "separator"
	}));
	fileMenu.append(new global.gui.MenuItem({
		// label: 'Save',
		label: fileMenuArray[2],
		click: save,
		key: "s",
  		modifiers: "ctrl"
	}));

	fileMenu.append(new global.gui.MenuItem({
		// label: 'Save As...',
		label: fileMenuArray[3],
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
		},
		key: "s",
  		modifiers: "shift-ctrl"
	}));
	fileMenu.append(new global.gui.MenuItem({
		type: "separator"
	}));

	var exportMenu = new global.gui.Menu();

	exportMenu.append(new global.gui.MenuItem({
		// label: 'PDF',
		label: exportMenuArray[0],
		click: exportToPDF,
		key: "e",
  		modifiers: "ctrl"
	}));

	exportMenu.append(new global.gui.MenuItem({
		// label: 'HTML',
		label: exportMenuArray[1],
		click: exportToHTML,
		key: "e",
  		modifiers: "shift-ctrl"
	}));

	


	fileMenu.append(new global.gui.MenuItem({
		// label: 'Quit',
		label: fileMenuArray[4],
		click: close,
		key: "q",
  		modifiers: "ctrl"
	}));

	var modeMenu = new global.gui.Menu();

	modeMenu.append(new global.gui.MenuItem({
		// label: 'Editor:Viewer',
		label: modeMenuArray[0],
		click: function() {
			// global.gui.App.quit();
			var Editor = global.$('.md_editor');
			var Viewer = global.$('.md_result');
			Editor.css({"float":"left",
						"display":"inline",
						"width":"49.7%",
						"margin-left":"5px"});
			Viewer.css({"float":"right",
						"display":"inline",
						"width":"49.4%",
						"margin-left":"0px"});
			global.$('.background').css({"background-color":"#ffffff"});
		},
		key: "1",
  		modifiers: "shift-ctrl"
	}));
	modeMenu.append(new global.gui.MenuItem({
		// label: 'Viewer:Editor',
		label: modeMenuArray[1],
		click: function() {
			// global.gui.App.quit();
			var Editor = global.$('.md_editor');
			var Viewer = global.$('.md_result');
			Editor.css({"float":"right",
						"display":"inline",
						"width":"49.7%",
						"margin-left":"0px"});
			Viewer.css({"float":"left",
						"display":"inline",
						"width":"50.1%",
						"margin-left":"0px"});
			global.$('.background').css({"background-color":"#272822"});
		},
		key: "2",
  		modifiers: "shift-ctrl"
	}));
	
	modeMenu.append(new global.gui.MenuItem({
		// label: 'Editor',
		label: modeMenuArray[2],
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
		},
		key: "3",
  		modifiers: "shift-ctrl"
	}));
	modeMenu.append(new global.gui.MenuItem({
		// label: 'Viewer',
		label: modeMenuArray[3],
		click: changeModeToViewer,
		key: "4",
  		modifiers: "shift-ctrl"
	}));
	modeMenu.append(new global.gui.MenuItem({
		type: "separator"
	}));

	modeMenu.append(new global.gui.MenuItem({
		// label: 'Hide Toolbar',
		label: modeMenuArray[4],
		click: hideToolbar,
		key: "h",
  		modifiers: "ctrl"
	}));
	modeMenu.append(new global.gui.MenuItem({
		// label: 'Show Toolbar',
		label: modeMenuArray[5],
		click: showToolbar,
		key: "h",
  		modifiers: "shift-ctrl"
	}));

	modeMenu.append(new global.gui.MenuItem({
		// label: 'Fullscreen',
		label: modeMenuArray[6],
		click: changeModeToFullscreen,
		key: "F11"
  		// modifiers: "shift-ctrl"
	}));

	modeMenu.append(new global.gui.MenuItem({
		// label: 'Exit Fullscreen',
		label: modeMenuArray[7],
		click: exitFullscreen,
		key: "F12"
  		// modifiers: "shift-ctrl"
	}));

	var editMenu = new global.gui.Menu();

	editMenu.append(new global.gui.MenuItem({
		// label: 'Undo',
		label: editMenuArray[0],
		click: function(){
			global.window.document.execCommand("undo");
		},
		key: "z",
  		modifiers: "ctrl"
	}));

	editMenu.append(new global.gui.MenuItem({
		// label: 'Redo',
		label: editMenuArray[1],
		click: function(){
			global.window.document.execCommand("redo");
		},
		key: "z",
  		modifiers: "shift-ctrl"
	}));

	editMenu.append(new global.gui.MenuItem({
		type: "separator"
	}));


	editMenu.append(new global.gui.MenuItem({
		// label: 'Cut',
		label: editMenuArray[2],
		click: function(){
			global.window.document.execCommand("cut");
		},
		key: "x",
  		modifiers: "ctrl"
	}));
	editMenu.append(new global.gui.MenuItem({
		// label: 'Copy',
		label: editMenuArray[3],
		click: function(){
			global.window.document.execCommand("copy");
		},
		key: "c",
  		modifiers: "ctrl"
	}));
	editMenu.append(new global.gui.MenuItem({
		// label: 'Paste',
		label: editMenuArray[4],
		click: function(){
			global.window.document.execCommand("paste");
		},
		key: "v",
  		modifiers: "ctrl"
	}));
	editMenu.append(new global.gui.MenuItem({
		type: "separator"
	}));

	editMenu.append(new global.gui.MenuItem({
		// label: 'Delete',
		label: editMenuArray[5],
		click: function(){
			global.window.document.execCommand("delete");
		},
		key: "d",
  		modifiers: "ctrl"
	}));

	editMenu.append(new global.gui.MenuItem({
		// label: 'Select All',
		label: editMenuArray[6],
		click: function(){
			global.window.document.execCommand("selectAll");
		},
		key: "a",
  		modifiers: "ctrl"
	}));

	var helpMenu = new global.gui.Menu();

	helpMenu.append(new global.gui.MenuItem({
		label: 'Mango Help',
		click: function(){

			checkSaved(function() {
				loadFile("./doc/Mango-Help.md");
				// isSaved = true;
				isExist = true;
				currentFileName = "./doc/Mango-Help.md";
			});

			
		}
	}));

	helpMenu.append(new global.gui.MenuItem({
		label: 'Markdown Syntax Help',
		click: function(){

			checkSaved(function() {
				loadFile("./doc/Markdown-Syntax-Help.md");
				// isSaved = true;
				isExist = true;
				currentFileName = "./doc/Markdown-Syntax-Help.md";
				
			});
			
		}
	}));

	helpMenu.append(new global.gui.MenuItem({
		type: "separator"
	}));

	helpMenu.append(new global.gui.MenuItem({
		label: 'Check for Update',
		click: function(){
			var request = require('request');
			request('http://xunmiweb.sinaapp.com/version', function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    console.log(body); // Show the HTML for the Google homepage. 
			    JSON.parse(body, function(k, v) {
				    if (k === 'Mango_version') {
				   	    console.log(v); 
				   	    if (v === "0.1.0") {
				   	    	bootbox.dialog({
							  message: "You already have the latest version.",
							  title: "Check for Update",
							  buttons: {
							    main: {
							      label: "OK",
							      className: "btn-primary",
							      callback: function() {

							      }
							    }
							  }
							});
				   	    } else {
				   	    	bootbox.dialog({
							  message: "The latest version is " + v + ", download it now?",
							  title: "Check for Update",
							  buttons: {
							    success: {
							      label: "NO",
							      className: "btn-success",
							      callback: function() {
							        
							      }
							    },
							    // danger: {
							    //   label: "Danger!",
							    //   className: "btn-danger",
							    //   callback: function() {
							    //     Example.show("uh oh, look out!");
							    //   }
							    // },
							    main: {
							      label: "YES",
							      className: "btn-primary",
							      callback: function() {
							      	global.gui.Shell.openExternal("https://github.com/egrcc/Mango");
							      }
							    }
							  }
							});
				   	    }
					} 
				}); 
			
			  }
			})
			
			
		}
	}));

	helpMenu.append(new global.gui.MenuItem({
		label: 'Acknowlegements',
		click: function(){

			checkSaved(function() {
				loadFile("./doc/Acknowlegements.md");
				// isSaved = true;
				isExist = true;
				currentFileName = "./doc/Acknowlegements.md";
				
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
					        <a href="https://github.com/egrcc/Mango">Mango in Github</a>\
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
	// win.on('new-win-policy', function (frame, url, policy) {
	//     global.gui.Shell.openExternal(url);
	//     policy.ignore();
	// });
	// global.$(".md_result").on('click', 'a', function (e) {

 //        e.preventDefault();
        
 //        // Open URL with default browser.
 //        global.gui.Shell.openExternal(e.target.href);

 //    });
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

function checkSaved(callback) {

	if (!isSaved) {

		bootbox.dialog({
		  message: "Do you want to save the file, then open another file?",
		  // title: "Custom title",
		  buttons: {
		  	
		    success: {
		      label: "Save",
		      className: "btn-success",
		      callback: function() {
		        save();
		        callback();
		      }
		    },
		    danger: {
		      label: "Don't Save",
		      className: "btn-danger",
		      callback: function() {
		        // global.gui.App.quit();
		        callback();
		      }
		    }
		    
		  }
		});
	} else {
		callback();
	}
}

function newFile() {
	isExist = false;
	loadText("");
}

function openFile() {
	checkSaved(function() {
		chooseFile("#openFileDialog", function(filename){
			loadFile(filename);
			// isSaved = true;
			isExist = true;
			currentFileName = filename;
		});
	});
}

function saveFile() {
	save();
}

function undo() {
	global.window.document.execCommand("undo");
}

function redo() {
	global.window.document.execCommand("redo");
}

function editMode() {
	var Editor = global.$('.md_editor');
	var Viewer = global.$('.md_result');
	Editor.css({"float":"left",
				"display":"inline",
				"width":"49.7%",
				"margin-left":"5px"});
	Viewer.css({"float":"right",
				"display":"inline",
				"width":"49.4%",
				"margin-left":"0px"});
	global.$('.background').css({"background-color":"#ffffff"});
}

function previewMode() {
	changeModeToViewer();
}

function exportToPDF() {
	console.log("pdf");
	if (!isHide) {
		hideToolbar();
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
			showToolbar();
			pdf.convert(options, function(result) {
			    result.toFile(pdffilename, function() {});
			    
			});
		});
	} else {
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
			    // showToolbar();
			});
		});
	}
	
}

function exportToHTML() {
	console.log("html");
	if (!isHide) {
		hideToolbar();
		changeModeToViewer();
		// global.$('#saveFileDialog').attr({"nwsaveas":"file.html"});
		console.log("html2");
		chooseFile("#htmlFileDialog", function(filename){
			console.log("html print");
			var fs = require('fs');
			// showToolbar();
			fs.writeFile(filename, global.window.document.documentElement.outerHTML, function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log("The file was saved!");
					showToolbar();
				}
			}); 
		});
	} else {
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
	
}

function hideToolbar() {
	isHide = true;
	global.$(".toolbar").css({"display": "none"});
	global.$(".background").css({"top": "0"});
}

function showToolbar() {
	isHide = false;
	global.$(".toolbar").css({"display": "inline"});
	global.$(".background").css({"top": "42px"});
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

function changeModeToFullscreen() {
	var win = global.gui.Window.get();
    win.enterKioskMode();
}

function exitFullscreen() {
	var win = global.gui.Window.get();
    win.leaveKioskMode();
}