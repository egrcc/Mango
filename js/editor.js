// var buffer = global.$;

// function escape(html, encode) {
//     return html
//       .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
//       .replace(/</g, '&lt;')
//       .replace(/>/g, '&gt;')
//       .replace(/"/g, '&quot;')
//      .replace(/'/g, '&#39;');
// }

// function previewDone() {
//     // this.mjRunning = false;
//     text = buffer;
//     // replace occurrences of &gt; at the beginning of a new line
//     // with > again, so Markdown blockquotes are handled correctly
//     text = text.replace(/^&gt;/mg, '>');
//     console.log("sdf");
//     resultDiv.html(marked(text));
    
// }

// exports.reload = function(){
// 	var marked = require("marked");
// 	// var mathjax = require("MathJax-node");
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
// 	// buffer.innerHTML = marked(text);
// 	// buffer.html(marked(text));
// 	// console.log(buffer.innerHTML);
// 	// mathjax.typeset(buffer, function(){resultDiv.html(marked(text));});
// 	// MathJax.Hub.Queue(["Typeset",MathJax.Hub,buffer]);
// 	// resultDiv.html(buffer.html());
// 	resultDiv.html(marked(text));
// 	// buffer = escape(text);
// 	// console.log("fgfgh");
// 	// global.MathJax.Hub.Queue(
//  //      ["Typeset",global.MathJax.Hub,buffer],
//  //      ["previewDone",],
//  //      ["resetEquationNumbers", global.MathJax.InputJax.TeX]
//  //    );
// };

exports.loadText = function(text){
	var textEditor = global.$('#editor');
	textEditor.val(text);
	var reload = require('./main.js').reload;
	reload();
};

exports.loadFile = function(file){
	var fs = require('fs');
	fs.readFile(file, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		exports.loadText(data);
	});
};

exports.chooseFile = function(name, callback) {
	var chooser = global.$(name);
	chooser.change(function(evt) {
		callback(global.$(this).val());
	});

	chooser.trigger('click');
};