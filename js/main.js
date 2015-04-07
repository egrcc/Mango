// var noMathBuffer;

exports.reload = function(){
	var marked = require("marked");
	// var mathjax = require("MathJax-node");
	marked.setOptions({
	renderer: new marked.Renderer(),
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: false,
		smartLists: true,
		smartypants: false
	});
	var resultDiv = global.$('.md_result');
	var buffer = global.window.document.getElementById("buffer");
	var textEditor = global.$('#editor');
	var text = textEditor.val();
	// noMathBuffer = marked(text);
	buffer.innerHTML = marked(text);
	// buffer.html(marked(text));
	// console.log(buffer.innerHTML);
	// mathjax.typeset(buffer, function(){resultDiv.html(marked(text));});
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,buffer],
					  ["preview",this]);

	// var flow = require('nimble');

	// flow.series([
	//   function (callback) {
	//     MathJax.Hub.Queue(["Typeset",MathJax.Hub,buffer]);
	//     console.log("aaaaaaaaaaaaaaaa");
	//     callback();
	//   },
	//   function (callback) {
	//     preview();
	//     console.log("bbbbbbbbbbbbbbbb");
	//     callback();
	//   }
	// ]);
	// resultDiv.html(buffer.html());
	// resultDiv.html(buffer.innerHTML);
	// buffer = escape(text);
	// console.log("fgfgh");
	// global.MathJax.Hub.Queue(
 //      ["Typeset",global.MathJax.Hub,buffer],
 //      ["previewDone",],
 //      ["resetEquationNumbers", global.MathJax.InputJax.TeX]
 //    );
}

function preview(){
	setTimeout(function(){
		var resultDiv = global.$('.md_result');
		resultDiv.html(buffer.innerHTML);
		// if (noMathBuffer != buffer.innerHTML){
		// 	resultDiv.html(buffer.innerHTML);
		// }
	}, 100);
}

function loadText(text){
	var textEditor = global.$('#editor');
	textEditor.val(text);
	exports.reload();
}

function loadFile(file){
	var fs = require('fs');
	fs.readFile(file, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		loadText(data);
	});
}

function chooseFile(name, callback) {
	var chooser = global.$(name);
	chooser.change(function(evt) {
		callback(global.$(this).val());
	});

	chooser.trigger('click');
}


function init(){
	var menu = require("./js/menu.js");
	menu.initMenu();

	global.$(global.window.document).ready(function(){
		// var editor = require("./js/editor.js");
		if(global.gui.App.argv.length > 0){
			// editor.loadFile(global.gui.App.argv[0]);
			loadFile(global.gui.App.argv[0]);
		}
		var textEditor = global.$('#editor');
		textEditor.bind('input propertychange', function() {
			// editor.reload();
			exports.reload();
			// setTimeout(function(){ MathJax.Hub.Queue(["Typeset",MathJax.Hub]); }, 100);
		});
		tabOverride.set(global.window.document.getElementsByTagName('textarea'));
	});
}

