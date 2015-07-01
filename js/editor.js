/*
                                ;!!!!!!!!!!!!!!!!!!!!;                                
                           !!!!!!!!!!!!!!ooooo!!!!!!!!!!!!!                           
                       !!!!!!!!oooooooooooooooooooooooo!!!!!!!!                       
                    !!!!!!oooooooooooooooooooooooooooooooooo!!!!!!                    
                 !!!!!!oooooooooooooooooooooooooooooooooooooooo!!!!!!                 
               !!!!!oooooooooooooooooooooooooooooooooooooooooooooo!!!!!               
             !!!!!oooooooooooooooooooooooooooooooooooooooooooooooooo!!!!!             
           ;!!!!oooooooooooooooooooooooooooooooooooooooooooooooooooooo!!!!!           
          !!!!oooooooooooooooooooooooooooooooooooooooooooooooooooooooooo!!!!          
         !!!!ooooooooooooo     oooooooooooooooooooooooooooooooooooooooooo!!!!         
        !!!oooooooooooooooo     ooooooooooooooooooooooooooooooooooooooooooo!!!;       
       !!!oooooooooooooooooo     ooooooooooooooooooooooo      oooooooooooooo!!!;      
      !!!ooooooooooooooooooo     ooooooooooooooooooooooo      ooooooooooooooo!!!      
     !!!!oooooooooooooooooooo     ooooooooooooooooooooo       oooooooooooooooo!!!     
    ;!!!ooooooooooooooooooooo!     ooooooooooooooooooo!       oooooooooooooooo!!!!    
    !!!oooooooooooooooooooooo      ooooooooooooooooooo  o     ooooooooooooooooo!!!    
    !!!ooooooooooooooooooooo;       ooooooooooooooooo  ;     oooooooooooooooooo!!!;   
   !!!!ooooooooooooooooooooo   ;    !oooooooooooooo!   o     oooooooooooooooooo!!!!   
   !!!!oooooooooooooooooooo    o     ooooooooooooo    oo     ooooooooooooooooooo!!!   
   !!!ooooooooooooooooooooo    oo     ooooooooooo    ooo     ooooooooooooooooooo!!!   
   !!!oooooooooooooooooooo    oooo     ooooooooo   ;ooo!    ;ooooooooooooooooooo!!!   
   !!!!ooooooooooooooooooo    ooooo     oooooo    ooooo     oooooooooooooooooooo!!!   
   ;!!!oooooooooooooooooo    ;oooooo      o      oooooo     ooooooooooooooooooo!!!!   
    !!!oooooooooooooooooo    oooooooo          oooooooo     ooooooooooooooooooo!!!    
    !!!!oooooooooooooooo     oooooooooo     !oooooooooo     ooooooooooooooooooo!!!    
     !!!oooooooooooooooo    oooooooooooooooooooooooooo!    !oooooooooooooooooo!!!     
     !!!!oooooooooooooo     oooooooooooooooooooooooooo     oooooooooooooooooo!!!!     
      !!!!ooooooooooooo     oooooooooooooooooooooooooo     ;oooooooooooooooo!!!!      
       !!!!oooooooooooo      ooooooooooooooooooooooooo;     ooooooooooooooo!!!!       
        !!!!ooooooooooooooooooooooooooooooooooooooooooo      ooooooooooooo!!!!        
         !!!!oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo!!!!         
           !!!!oooooooooooooooooooooooooooooooooooooooooooooooooooooooo!!!!;          
            !!!!!ooooooooooooooooooooooooooooooooooooooooooooooooooooo!!!!            
              !!!!!oooooooooooooooooooooooooooooooooooooooooooooooo!!!!!              
                !!!!!oooooooooooooooooooooooooooooooooooooooooooo!!!!!                
                  !!!!!!oooooooooooooooooooooooooooooooooooooo!!!!!!                  
                     !!!!!!!oooooooooooooooooooooooooooooo!!!!!!!                     
                        ;!!!!!!!!!ooooooooooooooooooo!!!!!!!!!                        
                             !!!!!!!!!!!!!!!!!!!!!!!!!!!!                             
                                    ;!!!!!!!!!!!!!                                    
*/
var lock = false;

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
	if (lock == false) {
		buffer.innerHTML = (marked(text));
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,buffer],
      				  ["preview",this]);
	}
	
	// MathJax.Hub.Queue(["Typeset",MathJax.Hub],
 //      				  ["preview",this]);
	hljs.initHighlighting.called = false;
	hljs.initHighlighting();
}

// function preload(){
	
// 	var resultDiv = global.$('.md_result');
// 	var buffer = global.window.document.getElementById("buffer");
// 	var textEditor = global.$('#editor');
// 	var text = textEditor.val();
// 	text = escape(text);
// 	buffer.innerHTML = (text);
// 	MathJax.Hub.Queue(["Typeset",MathJax.Hub,buffer],
//       				  ["preview",this]);

	
	
// }

function reload(){
	preload();
	if (currentFileName != null) {
		global.$("title").html(currentFileName + '*' + " --- Mango");
	}
	isSaved = false;
	
};

function preview(){

	if (lock == false){
		lock = true;
		setTimeout(function(){
			var path = require('path');
			var resultDiv = global.$('.md_result');

			if (currentDirectory != null) {
				$("#buffer img").each(function() {
				    // console.log(global.$(this).attr("src"));
				    // console.log(path.basename(global.$(this).attr("src")));
				    if (global.$(this).attr("src").indexOf('.') == 0) {
				    	filePath = global.$(this).attr("src").substring(1);
				    	console.log(currentDirectory + filePath);
				    	global.$(this).attr("src", currentDirectory + filePath);
				    }
				});
			}
			
			resultDiv.html(buffer.innerHTML);
			lock = false;
		}, 300);
	}
	
}

// function preview(){
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
// 	setTimeout(function(){
// 		var resultDiv = global.$('.md_result');
// 		var text = buffer.innerHTML;
// 		text = text.replace(/&gt;/mg, '>');
// 		resultDiv.html(marked(text));
// 		hljs.initHighlighting.called = false;
// 		hljs.initHighlighting();
// 	}, 300);
	
// }

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
		console.log("asd");
		callback(global.$(this).val());
		// this.value = null;
	});

	chooser.click(function() {
		// console.log("asd");
		// callback(global.$(this).val());
		this.value = null;
	});

	chooser.trigger('click');
};


function openChooseFile(name, callback) {
	var chooser = global.$(name);
	chooser.change(function(evt) {
		console.log(process.cwd());
		callback(global.$(this).val());
		// this.value = null;
	});
	chooser.click(function() {
		// console.log("asd");
		// callback(global.$(this).val());
		this.value = null;
	});

	chooser.trigger('click');
};

function uploadfile(){
	console.log("uploadfile");

};
