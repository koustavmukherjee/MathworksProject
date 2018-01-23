function PropertyHeader(isTunable, type, getAccess, setAccess, isConstant, isHidden, isDiscreteState, isDependent) {
	this.type = type || 0;
	this.getAccess = getAccess || 0;
	this.setAccess = setAccess || 0;
	this.isTunable = isTunable || 0;
	this.isConstant = isConstant || 0;
	this.isHidden = isHidden || 0;
	this.isDiscreteState = isDiscreteState || 0;
	this.isDependent = isDependent || 0;
	this.groupIdentifier = function() {
		return '' + this.setAccess + this.getAccess + this.isTunable + 
		(this.type == Properties.constants.propertyTypeReverseEnum['StringSet'] ? '0' : this.type) 
		+ this.isConstant + this.isHidden + this.isDiscreteState + this.isDependent;
	}
}

//Property inherits from Property Header
function Property(name, value, isTunable, type, getAccess, setAccess, isConstant, isHidden, isDiscreteState, isDependent) {
	this.name = name;
	this.value = value;
	PropertyHeader.call(this, isTunable, type, getAccess, setAccess, isConstant, isHidden, isDiscreteState, isDependent);
}