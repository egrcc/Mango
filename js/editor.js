
// function preload(){
// 	var marked = require("marked");
// 	marked.setOptions({
// 	renderer: new marked.Renderer(),
// 		gfm: true,
// 		tables: true,
// 		breaks: false,
// 		pedantic: false,
// 		sanitize: false,
// 		smartLists: true,
// 		smartypants: false
// 	});
// 	var resultDiv = global.$('.md_result');
// 	var buffer = global.window.document.getElementById("buffer");
// 	var textEditor = global.$('#editor');
// 	var text = textEditor.val();
// 	buffer.innerHTML = (marked(text));
// 	MathJax.Hub.Queue(["Typeset",MathJax.Hub,buffer],
//       				  ["preview",this]);
// 	hljs.initHighlighting.called = false;
// 	hljs.initHighlighting();
// }

function preload(){
	
	var resultDiv = global.$('.md_result');
	var buffer = global.window.document.getElementById("buffer");
	var textEditor = global.$('#editor');
	var text = textEditor.val();
	text = escape(text);
	buffer.innerHTML = (text);
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,buffer],
      				  ["preview",this]);

	
	
}

function reload(){
	preload();
	if (currentFileName != null) {
		global.$("title").html(currentFileName + '*');
	}
	isSaved = false;
	
};

// function preview(){
// 	setTimeout(function(){
// 		var resultDiv = global.$('.md_result');
// 		resultDiv.html(buffer.innerHTML);
// 	}, 300);
	
// }

function preview(){
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
	setTimeout(function(){
		var resultDiv = global.$('.md_result');
		var text = buffer.innerHTML;
		text = text.replace(/&gt;/mg, '>');
		resultDiv.html(marked(text));
		hljs.initHighlighting.called = false;
		hljs.initHighlighting();
	}, 300);
	
}

function escape(html, encode) {
    return html
      .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
     .replace(/'/g, '&#39;');
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