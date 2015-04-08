
function preload(){
	var marked = require("marked");
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
	buffer.innerHTML = (marked(text));
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,buffer],
      				  ["preview",this]);
	hljs.initHighlighting.called = false;
	hljs.initHighlighting();
}

function reload(){
	preload();
	isSaved = false;
	// f = function(){
	// 	var resultDiv = global.$('.md_result');
	// 	resultDiv.html(buffer.innerHTML);
	// }

	// MathJax.Hub.Queue(["Typeset",MathJax.Hub,buffer]);
	// setTimeout(f, 1000);
	// MathJax.Hub.Queue(f); 
	// console.log(buffer.html());
	// resultDiv.html(marked(text));
};

function preview(){
	setTimeout(function(){
		var resultDiv = global.$('.md_result');
		resultDiv.html(buffer.innerHTML);
	}, 300);
	
}

function loadText(text){
	var textEditor = global.$('#editor');
	textEditor.val(text);
	preload();
	isSaved = true;
};

function loadFile(file){
	var fs = require('fs');
	fs.readFile(file, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		loadText(data);
	});
};

function chooseFile(name, callback) {
	var chooser = global.$(name);
	chooser.change(function(evt) {
		callback(global.$(this).val());
	});

	chooser.trigger('click');
};