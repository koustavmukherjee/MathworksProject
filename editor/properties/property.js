function Property(name, value, isTunable, type, getAccess, setAccess, isConstant, isHidden) {
	this.name = name;
	this.value = value;
	this.type = type;
	this.getAccess = getAccess;
	this.setAccess = setAccess;
	this.isTunable = isTunable;
	this.isConstant = isConstant;
	this.isHidden = isHidden;
	this.groupIdentifier = '' + this.setAccess + this.getAccess + this.isTunable + this.type + this.isConstant + this.isHidden;
}