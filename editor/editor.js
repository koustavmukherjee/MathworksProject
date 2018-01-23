$("#compile-failure").hide();
var editor = CodeMirror.fromTextArea(document.getElementById("code"),
{
    mode: {name: "octave",
           version: 2,
           singleLineStringErrors: false},
    lineNumbers: true,
    indentUnit: 4,
    matchBrackets: true
});
var classDef = new ClassDef('sample', 'matlab.System');
editor.getDoc().setValue(classDef.toString());