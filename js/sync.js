fs = require('fs');
crypto = require('crypto');
Evernote = require('evernote').Evernote;


var dev_tokens = "S=s1:U=90a6a:E=153f0844000:C=14c98d312c0:P=1cd:A=en-devtoken:V=2:H=d303a29793ef1acfb7c539d84304c0e7";

var authToken = dev_tokens;

var client = new Evernote.Client({token: authToken, sandbox: true});


function sync() {
    var noteStore = client.getNoteStore();

    // List all of the notebooks in the user's account
    var notebooks = noteStore.listNotebooks(function(err, notebooks) {
      console.log("Found " + notebooks.length + " notebooks:");
      for (var i in notebooks) {
        console.log("  * " + notebooks[i].name);
      }
    });

    var note = new Evernote.Note();
    note.title = "Test note from Mango";
    note.content = '<?xml version="1.0" encoding="UTF-8"?>';
    note.content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
    note.content += '<en-note>Here is the Evernote logo:<br/>';
    // note.content += '<en-media type="image/png" hash="' + hh + '"/>';
    note.content += '</en-note>';
    noteStore.createNote(note, function(err, createdNote) {
      console.log();
      console.log("Creating a new note in the default notebook");
      console.log();
      console.log("Successfully created a new note with GUID: " + createdNote.guid);
    });
}


// To create a new note, simply create a new Note object and fill in
// attributes such as the note's title.


// To include an attachment such as an image in a note, first create a Resource
// for the attachment. At a minimum, the Resource contains the binary attachment
// data, an MD5 hash of the binary data, and the attachment MIME type.
// It can also include attributes such as filename and location.
// var image = fs.readFileSync('enlogo.png');
// var hash = image.toString('base64');

// var data = new Evernote.Data();
// data.size = image.length;
// data.bodyHash = hash;
// data.body = image;

// resource = new Evernote.Resource();
// resource.mime = 'image/png';
// resource.data = data;

// Now, add the new Resource to the note's list of resources
// note.resources = [resource];

// To display the Resource as part of the note's content, include an <en-media>
// tag in the note's ENML content. The en-media tag identifies the corresponding
// Resource using the MD5 hash.
// var md5 = crypto.createHash('md5');
// md5.update(image);
// hashHex = md5.digest('hex');

// The content of an Evernote note is represented using Evernote Markup Language
// (ENML). The full ENML specification can be found in the Evernote API Overview
// at http://dev.evernote.com/documentation/cloud/chapters/ENML.php


// Finally, send the new note to Evernote using the createNote method
// The new Note object that is returned will contain server-generated
// attributes such as the new note's unique GUID.

