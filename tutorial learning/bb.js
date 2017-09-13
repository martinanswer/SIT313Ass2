
//=========================================================
//my component
//=================================================
function createRichTextEdit(){
  var toolbar = $("<div class='toolbar'>toolbar</div>");
  var editableArea = $("<div class='editablecontent' contenteditable='true'><p>&nbsp;</p></div>");

  var h1Button = $("<button>H1</button>");
  h1Button.on("click",function(){
    editableArea.append("<h1>&nbsp;</h1>")

  })
  toolbar.append(h1Button);



  var saveButton = $("<button>Save</button>");
  saveButton.on("click",function(){
    var contents = editableArea.html();

    var upto = contents.indexOf(">");
    while (upto >= 0) {
        var remainContents = contents.substring(upto+1);
        console.log(upto);
        console.log(remainContents);

        while (remainContents.startsWith("&nbsp;")) {
            console.log("aaaa")
          remainContents = remainContents.substring(6);
          console.log("bbb" + remainContents);
        }
        contents = contents.substring(0,upto+1) + remainContents;
        console.log(contents);
        upto = contents.indexOf(">",upto+1);
        console.log(upto);
    }

    alert(contents);

  })

  var node = $("<div class='richtextedit'></div>");

  node.append(toolbar);
  node.append(editableArea);
  node.append(saveButton);

  return node;
}





$(document).ready(function(){
  console.log("My app starting....");

  $("body").append(createRichTextEdit());


});
