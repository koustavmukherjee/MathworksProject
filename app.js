var addNumericProperty = function() {
	try {
    	classDef = this.parse();
		classDef.addProperty(window.Properties.propertyNameGenerator(),'',1,0,0,0,0,0);
		editor.getDoc().setValue(classDef.toString());
	}
	catch(err) {
    	console.error(err);
	}
}

var addLogicalProperty = function() {
	try {
    	classDef = this.parse();
		classDef.addProperty(window.Properties.propertyNameGenerator(),true,1,1,0,0,0,0);
		editor.getDoc().setValue(classDef.toString());
	}
	catch(err) {
    	console.error(err);
	}
}

var addPositiveInteger = function() {
	try {
    	classDef = this.parse();
		classDef.addProperty(window.Properties.propertyNameGenerator(),1,1,2,0,0,0,0);
		editor.getDoc().setValue(classDef.toString());
	}
	catch(err) {
    	console.error(err);
	}
}

var addTunableNumeric = function() {
	try {
    	classDef = this.parse();
		classDef.addProperty(window.Properties.propertyNameGenerator(),undefined,0,0,0,0,0,0);
		editor.getDoc().setValue(classDef.toString());
	}
	catch(err) {
    	console.error(err);
	}
}

var addPrivateProperty = function() {
	try {
    	classDef = this.parse();
		classDef.addProperty(window.Properties.propertyNameGenerator(),undefined,0,0,1,1,0,0);
		editor.getDoc().setValue(classDef.toString());
	}
	catch(err) {
    	console.error(err);
	}
}

var addProtectedProperty = function() {
	try {
    	classDef = this.parse();
		classDef.addProperty(window.Properties.propertyNameGenerator(),undefined,0,0,2,2,0,0);
		editor.getDoc().setValue(classDef.toString());
	}
	catch(err) {
    	console.error(err);
	}
}

var parse = function() {
	var editorContents = editor.getDoc().getValue();
	var classDef = Parser.parse(editorContents);
	return classDef;
}