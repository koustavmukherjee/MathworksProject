function ClassDef(name, extendsSystem) {
	this.name = name;
	this.extendsSystem = extendsSystem;
	this.propertyGroups = {};
	this.methodGroups = {};
	this.toString = function(){
		var codeBlock = 'classdef ' + this.name;
		codeBlock += extendsSystem !== '' ? ' < ' + this.extendsSystem : '';
		for(var propertyGroup in this.propertyGroups) {
			var properties = this.propertyGroups[propertyGroup];
			codeBlock += '\n\t'+ window.Properties.getPropertyGroupHeader(propertyGroup);
			for(var i = 0; i < properties.length; i++) {
				codeBlock += '\n\t\t' + properties[i].name;
				if(properties[i].type === Properties.constants.propertyTypeReverseEnum['StringSet']) {
					codeBlock += ' = matlab.system.StringSet({';
					for(var j = 0; j < properties[i].value.length; j++) {
						codeBlock += '\'' + properties[i].value[j] + '\'';
						if(j !== properties[i].value.length - 1)
							codeBlock += ','
					}
					codeBlock += '})';
				}
				else {
					if(typeof properties[i].value !== 'undefined' && properties[i].value !== '') {
						codeBlock += ' = ' + properties[i].value;
					}
				}
			}
			codeBlock += '\n\tend';
		}
		for(var methodGroup in this.methodGroups) {
			var method = this.methodGroups[methodGroup];
			if(typeof method !== 'undefined') {
				codeBlock += '\n';
				codeBlock += method.toString();
			}
		}
		codeBlock += '\n' + 'end';
		return codeBlock;
	}
	this.addProperty = function(name, value, isTunable, type, getAccess, setAccess, isConstant, isHidden, isDiscreteState, isDependent){
		var property = new Property(name, value, isTunable, type, getAccess, setAccess, isConstant, isHidden, isDiscreteState, isDependent);
		var propertyGroupIdentifier = property.groupIdentifier();
		if(typeof this.propertyGroups[propertyGroupIdentifier] === 'undefined')
			this.propertyGroups[propertyGroupIdentifier] = [];
		this.propertyGroups[propertyGroupIdentifier].push(property);
	}
	this.addFunction = function(accessType, fn) {
		if(typeof this.methodGroups[accessType] === 'undefined')
			this.methodGroups[accessType] = new Method(accessType, []);
		this.methodGroups[accessType].addFunction(fn);
	}
}