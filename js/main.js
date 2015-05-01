/**
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
**/

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