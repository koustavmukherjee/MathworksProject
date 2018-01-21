var addNumericProperty = function() {
	classDef.addProperty(window.Properties.propertyNameGenerator(),'',1,0,0,0,0,0);
	editor.getDoc().setValue(classDef.toString());
}