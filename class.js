function ClassDef(name, extendsSystem) {
	this.name = name;
	this.extendsSystem = extendsSystem;
	this.propertyGroups = {};
	this.methods = [];
	this.toString = function(){
		var codeBlock = 'classdef ' + name;
		codeBlock += extendsSystem !== '' ? ' < ' + extendsSystem : '';
		for(var propertyGroup in this.propertyGroups) {
			var properties = this.propertyGroups[propertyGroup];
			codeBlock += '\n\t'+ window.Properties.getPropertyGroupHeader(propertyGroup);
			for(var i = 0; i < properties.length; i++) {
				codeBlock += '\n\t\t' + properties[i].name;
				if(properties[i].value !== 'undefined' && properties[i].value !== '') {
					codeBlock += ' = ' + properties[i].value;
				}
			}
			codeBlock += '\n\tend';
		}
		codeBlock += '\n' + 'end';
		return codeBlock;
	}
	this.addProperty = function(name, value, isTunable, type, getAccess, setAccess, isConstant, isHidden){
		var property = new Property(name, value, isTunable, type, getAccess, setAccess, isConstant, isHidden);
		var propertyGroupIdentifier = property.groupIdentifier;
		if(typeof this.propertyGroups[propertyGroupIdentifier] === 'undefined')
			this.propertyGroups[propertyGroupIdentifier] = [];
		this.propertyGroups[propertyGroupIdentifier].push(property);
	}
}