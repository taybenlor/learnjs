/* Author: Ben Taylor

*/

function make_put(el){
  var func = function(){
    var str_thing = "";
    $A(arguments).each(function(thing){
      str_thing += String.interpret(thing) + " ";
    })
    var line = new Element('li');
    line.insert({top: "<span class=\"put\"> &gt; </span>"});
    line.insert({bottom: "<span class=\"text\">" + str_thing + "</span>"});
    el.insert({bottom: line});
  }
  return func;
}

function make_check(el){
  var func = function(pass, thing){
    var str_thing = String.interpret(thing);
    var line = new Element('li');
    if(!!pass){
      line.insert({top: "<span class=\"pass\"> YAY </span>"});
    }
    else{
      line.insert({top: "<span class=\"fail\"> NAY </span>"});
    }
    line.insert({bottom: "<span class=\"text\">" + str_thing + "</span>"});
    el.insert({bottom: line});
  }
  return func;
}


Event.observe(document, 'dom:loaded', function(){
  $$('.lesson').each(function(el){
    var textarea = el.select('textarea').first();
    if(!textarea){
      return
    }
    
    
    var logarea = new Element('ul');
    
    /* These are our helper functions */
    var put = make_put(logarea);
    var check = make_check(logarea);
    
    var button = new Element('button');
    button.insert("Run");
    
    
    var editor = CodeMirror.fromTextArea(textarea.identify(),{
      saveFunction: function(){
        var code = editor.getCode();
        logarea.innerHTML = "";
        var result = eval(code);
      }
    });
    
    button.observe('click', function(){
      var code = editor.getCode();
      logarea.innerHTML = "";
      var result = eval(code);
    });

    el.insert({bottom: button});
    el.insert({bottom: logarea});
    

  });
});



















