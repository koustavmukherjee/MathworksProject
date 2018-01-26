function Method(accessType, functions) {
	this.accessType = accessType;
	this.functions = functions || {};
	this.toString = function() {
		var methodBlock = '\tmethods';
		if(Properties.constants.propertyTypeEnum[accessType] !== undefined && Properties.constants.propertyTypeEnum[accessType] !== '') {
			methodBlock += '(Access = ' + Properties.constants.accessSpecifierEnum[accessType] + ')';
		}
		methodBlock += '\n';
		if(typeof functions !== 'undefined') {
			var first = true;
			for(var fn in functions) {
				if(!first)
					methodBlock += '\n' + functions[fn].toString();
				else {
					methodBlock += functions[fn].toString();
					first = false;
				}
			}
		}
		methodBlock += '\tend';
		return methodBlock;
	}
	this.addFunction = function(fn) {
		if(typeof this.functions[fn.name] === 'undefined')
			this.functions[fn.name] = fn;
	}
}

function Fn(name, parameters, body, outputs, optionalInput, optionalOutput) {
	this.name = name;
	this.parameters = parameters;
	this.body = body;
	this.outputs = outputs;
	this.optionalInput = optionalInput;
	this.optionalOutput = optionalOutput;
	this.toString = function() {
		var functionBlock = '\t\tfunction ';
		if(typeof this.outputs !== 'undefined' && this.outputs.length === 1) {
			functionBlock += this.outputs[0]
			functionBlock += ' = '
		}
		else if(typeof this.outputs !== 'undefined' && this.outputs.length > 1) {
			functionBlock += '[' + this.outputs;
			if(typeof this.optionalOutput !== 'undefined' && this.optionalOutput.trim() !== '')
				functionBlock += ',' + this.optionalOutput;
			functionBlock += ']';
			functionBlock += ' = '
		}
		functionBlock += this.name;
		if(typeof this.parameters !== 'undefined' && this.parameters.length > 0) {
			functionBlock += '(' + this.parameters;
			if(typeof this.optionalInput !== 'undefined' && this.optionalInput.trim() !== '')
				functionBlock += ',' + this.optionalInput;
			functionBlock += ')';
		}
		if(typeof this.body !== 'undefined' && this.body.trim !== '') {
			functionBlock += '\n' + this.body;									
		}
		functionBlock += '\n\t\tend\n';
		return functionBlock;
	}
}