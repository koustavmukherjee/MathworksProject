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

var logicalCheckboxValueChanged = function(lcb) {
	if(lcb.checked) {
		$("#PositiveIntegerCheckbox").attr("disabled", true);
		$("#DependentCheckbox").attr("disabled", true);
	}
	else {
		$("#PositiveIntegerCheckbox").attr("disabled", false);
		$("#DependentCheckbox").attr("disabled", false);	
	}
}

var nonTunableCheckboxValueChanged = function(ntcb) {
	if(ntcb.checked) {
		$("#DiscreteStateCheckbox").attr("disabled", true);
	}
	else {
		$("#DiscreteStateCheckbox").attr("disabled", false);
	}
}

var discreteStateCheckboxValueChanged = function(dvcb) {
	if(dvcb.checked) {
		$("#NontunableCheckbox").attr("disabled", true);
		$("#ConstantCheckbox").attr("disabled", true);
		$("#DependentCheckbox").attr("disabled", true);
	}
	else {
		$("#NontunableCheckbox").attr("disabled", false);
		$("#ConstantCheckbox").attr("disabled", false);
		$("#DependentCheckbox").attr("disabled", false);
	}
}

var positiveIntegerCheckboxValueChanged = function(picb) {
	if(picb.checked) {
		$("#LogicalCheckbox").attr("disabled", true);
		$("#DependentCheckbox").attr("disabled", true);
	}
	else {
		$("#LogicalCheckbox").attr("disabled", false);
		$("#DependentCheckbox").attr("disabled", false);
	}
}

var constantCheckboxValueChanged = function(cb) {
	if(cb.checked) {
		$("#DiscreteStateCheckbox").attr("disabled", true);
		$("#DependentCheckbox").attr("disabled", true);
	}
	else {
		$("#DiscreteStateCheckbox").attr("disabled", false);
		$("#DependentCheckbox").attr("disabled", false);
	}
}

var dependentCheckboxValueChanged = function(cb) {
	if(cb.checked) {
		$("#LogicalCheckbox").attr("disabled", true);
		$("#DiscreteStateCheckbox").attr("disabled", true);
		$("#PositiveIntegerCheckbox").attr("disabled", true);
		$("#ConstantCheckbox").attr("disabled", true);
	}
	else {
		$("#LogicalCheckbox").attr("disabled", false);
		$("#DiscreteStateCheckbox").attr("disabled", false);
		$("#PositiveIntegerCheckbox").attr("disabled", false);
		$("#ConstantCheckbox").attr("disabled", false);
	}
}

var insertCustomProperty = function() {
	var hidden = $("#HiddenCheckbox").is(":checked") ? 1 : 0;
	var constant = $("#ConstantCheckbox").is(":checked") ? 1 : 0;
	var dependent = $("#DependentCheckbox").is(":checked") ? 1 : 0;
}