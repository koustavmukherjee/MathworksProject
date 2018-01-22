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
		classDef.addProperty(window.Properties.propertyNameGenerator(),1,1,2,0,0,0,0,0,0);
		editor.getDoc().setValue(classDef.toString());
	}
	catch(err) {
    	console.error(err);
	}
}

var addTunableNumeric = function() {
	try {
    	classDef = this.parse();
		classDef.addProperty(window.Properties.propertyNameGenerator(),undefined,0,0,0,0,0,0,0,0);
		editor.getDoc().setValue(classDef.toString());
	}
	catch(err) {
    	console.error(err);
	}
}

var addPrivateProperty = function() {
	try {
    	classDef = this.parse();
		classDef.addProperty(window.Properties.propertyNameGenerator(),undefined,0,0,1,1,0,0,0,0);
		editor.getDoc().setValue(classDef.toString());
	}
	catch(err) {
    	console.error(err);
	}
}

var addProtectedProperty = function() {
	try {
    	classDef = this.parse();
		classDef.addProperty(window.Properties.propertyNameGenerator(),undefined,0,0,2,2,0,0,0,0);
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
	var logical = $("#LogicalCheckbox").is(":checked") ? 1 : 0;
	var nontunable = $("#NontunableCheckbox").is(":checked") ? 1 : 0;
	var discreteState = $("#DiscreteStateCheckbox").is(":checked") ? 1 : 0;
	var positiveInteger = $("#PositiveIntegerCheckbox").is(":checked") ? 2 : 0;
	
	var getAccess = Properties.constants.accessSpecifierReverseEnum[$("#SetAccessSelection").val()];
	var setAccess = Properties.constants.accessSpecifierReverseEnum[$("#GetAccessSelection").val()];

	try {
    	classDef = this.parse();
		classDef.addProperty(window.Properties.propertyNameGenerator(),undefined,nontunable,logical || positiveInteger
							,getAccess,setAccess,constant,hidden,discreteState,dependent);
		editor.getDoc().setValue(classDef.toString());
	}
	catch(err) {
    	console.error(err);
	}

}

var clearCustomPropertiesModal = function() {
	$("#HiddenCheckbox").prop('checked', false);
	$("#ConstantCheckbox").prop('checked', false);
	$("#DependentCheckbox").prop('checked', false);
	$("#LogicalCheckbox").prop('checked', false);
	$("#NontunableCheckbox").prop('checked', false);
	$("#DiscreteStateCheckbox").prop('checked', false);
	$("#PositiveIntegerCheckbox").prop('checked', false);

	$("#HiddenCheckbox").prop('disabled', false);
	$("#ConstantCheckbox").prop('disabled', false);
	$("#DependentCheckbox").prop('disabled', false);
	$("#LogicalCheckbox").prop('disabled', false);
	$("#NontunableCheckbox").prop('disabled', false);
	$("#DiscreteStateCheckbox").prop('disabled', false);
	$("#PositiveIntegerCheckbox").prop('disabled', false);

	$("#SetAccessSelection").val('public');
	$("#GetAccessSelection").val('public');
}