function PropertyHeader(isTunable, type, getAccess, setAccess, isConstant, isHidden) {
	this.type = type || 0;
	this.getAccess = getAccess || 0;
	this.setAccess = setAccess || 0;
	this.isTunable = isTunable || 0;
	this.isConstant = isConstant || 0;
	this.isHidden = isHidden || 0;
	this.groupIdentifier = '' + this.setAccess + this.getAccess + this.isTunable + this.type + this.isConstant + this.isHidden;
}

//Property inherits from Property Header
function Property(name, value, isTunable, type, getAccess, setAccess, isConstant, isHidden) {
	this.name = name;
	this.value = value;
	PropertyHeader.call(this, isTunable, type, getAccess, setAccess, isConstant, isHidden);
}