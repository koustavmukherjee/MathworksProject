Parser = (function(input) {
	var lookAheadToken; //looking ahead 1 character at a time
	var lexer;
	return {
		parse: function(input) {
			lexer = Lexer;
			lexer.initialize(input);
			lookAheadToken = lexer.nextToken();
			return this.parseClassDef();
		},
		parseClassDef: function() {
			this.match('classdef');
			var classDef = new ClassDef();
			var propertyGroups = {};
			if(lookAheadToken.type === TokenTypes.IDENTIFIER) {
				var className = lookAheadToken.value;
				this.match(className);
				classDef.name = className;
				if(lookAheadToken.type === TokenTypes.LESS_THAN) {
					this.match('<');
					var classExtends = lookAheadToken.value;
					if(lookAheadToken.type !== TokenTypes.IDENTIFIER)
						throw new Error("Parser: Syntax error detected while parsing class def. Expected extends matlab system identifier but received " + lookAheadToken.value);
					else {
						classDef.extendsSystem = classExtends;
						this.match(classExtends)
					}
				}
				while(lookAheadToken.value !== 'end') {
					if(lookAheadToken.value === 'properties') {
						this.parseProperties(propertyGroups);
						classDef.propertyGroups = propertyGroups;
					}
					else if(lookAheadToken.type === TokenTypes.NEW_LINE) {
						this.match('\n');
					}
				}
				this.match('end');
				return classDef;
			}
			else {
				throw new Error("Parser: Syntax error detected while parsing class def. Expected class name identifier but received " + lookAheadToken.value);
			}
		},
		parseProperties: function(propertyGroups) {
			this.match('properties');
			var propertyHeader = new PropertyHeader();
			properties = [];
			if(lookAheadToken.type === TokenTypes.NEW_LINE) {
				properties = this.processProperties(propertyHeader);
			}
			else {
				this.parsePropertyHeader(propertyHeader);
				properties = this.processProperties(propertyHeader);
			}
			this.match('end');
			if(typeof propertyGroups[propertyHeader.groupIdentifier()] === 'undefined')
				propertyGroups[propertyHeader.groupIdentifier()] = properties;
			else {
				propertyGroups[propertyHeader.groupIdentifier()].concat(properties);
			}
		},
		parsePropertyHeader: function(propertyHeader) {
			this.match('(');
			this.processPropertyHeaderTerms(propertyHeader);
			while(lookAheadToken.type === TokenTypes.COMMA) {
				this.match(',');
				this.processPropertyHeaderTerms(propertyHeader);
			}
			this.match(')');
		},
		processPropertyHeaderTerms: function(propertyHeader) {
			if(typeof Keywords[lookAheadToken.value] === 'undefined')
				throw new Error("Parser: Syntax error detected at parse property header. Expected any keyword but got " + lookAheadToken.value);
			else {
				if (lookAheadToken.value === 'Access' || lookAheadToken.value === 'GetAccess' || lookAheadToken.value === 'SetAccess')
					this.parsePropertyHeaderTermEquality(propertyHeader);
				else {
					this.parsePropertyHeaderTerm(propertyHeader);
				}
			}
		},
		parsePropertyHeaderTermEquality: function(propertyHeader) {
			var lhs = lookAheadToken.value;
			this.match(lhs);
			this.match('=');
			var rhs = lookAheadToken.value;
			if(typeof Properties.constants.accessSpecifierReverseEnum[rhs] === 'undefined') {
				throw new Error("Parser: Syntax error detected at parse property header. Expected valid access specifier but encountered " + rhs.value);
			}
			else {
				if(lhs === 'Access') {
					propertyHeader.getAccess = Properties.constants.accessSpecifierReverseEnum[rhs];
					propertyHeader.setAccess = Properties.constants.accessSpecifierReverseEnum[rhs];
				}
				else if(lhs === 'GetAccess') {
					propertyHeader.getAccess = Properties.constants.accessSpecifierReverseEnum[rhs];
				}
				else if(lhs === 'SetAccess') {
					propertyHeader.setAccess = Properties.constants.accessSpecifierReverseEnum[rhs];
				}
				else {
					throw new Error("Parser: Syntax error detected at parse property header. Expected valid access restrictor but encountered " + lhs.value);
				}
			}
			this.match(rhs);
		},
		parsePropertyHeaderTerm: function(propertyHeader) {
			if(typeof Properties.constants.propertyTunableReverseEnum[lookAheadToken.value] !== 'undefined') {
				propertyHeader.isTunable = Properties.constants.propertyTunableReverseEnum[lookAheadToken.value];
				this.consume(lookAheadToken.value);
			}
			else if(typeof Properties.constants.propertyTypeReverseEnum[lookAheadToken.value] !== 'undefined') {
				propertyHeader.type = Properties.constants.propertyTypeReverseEnum[lookAheadToken.value];
				this.consume(lookAheadToken.value);
			}
			else if(typeof Properties.constants.constantReverseEnum[lookAheadToken.value] !== 'undefined') {
				propertyHeader.isConstant = Properties.constants.constantReverseEnum[lookAheadToken.value];
				this.consume(lookAheadToken.value);
			}
			else if(typeof Properties.constants.hiddenReverseEnum[lookAheadToken.value] !== 'undefined') {
				propertyHeader.isHidden = Properties.constants.hiddenReverseEnum[lookAheadToken.value];
				this.consume(lookAheadToken.value);
			}
			else {
				throw new Error("Parser: Syntax error detected at parse property header. Unexpected Keyword encountered " + lookAheadToken.value);
			}
		},
		processProperties: function(propertyHeader) {
			var properties = [];
			this.match('\n');
			var property = this.parseProperty(propertyHeader);
			properties.push(property);
			while(lookAheadToken.type === TokenTypes.NEW_LINE) {
				this.match('\n');
				if(lookAheadToken.value !== 'end') {
					property = this.parseProperty(propertyHeader);
					properties.push(property);
				}
			}
			return properties;
		},
		parseProperty: function(propertyHeader) {
			var property = new Property();
			if(lookAheadToken.type !== TokenTypes.IDENTIFIER) {
				throw new Error("Parser: Syntax error detected at parse property. Expected identifier but encountered " + lookAheadToken.value);
			}
			else {
				var propertyName = lookAheadToken.value;
				property.name = propertyName;
				this.match(propertyName);
				if(lookAheadToken.type === TokenTypes.EQUALS) {
					this.match('=');
					var propertyValue = lookAheadToken.value;
					property.value = propertyValue;
					this.match(propertyValue);
				}
				property.type = propertyHeader.type;
				property.getAccess = propertyHeader.getAccess;
				property.setAccess = propertyHeader.setAccess;
				property.isTunable = propertyHeader.isTunable;
				property.isConstant = propertyHeader.isConstant;
				property.isHidden = propertyHeader.isHidden;
				return property;
			}
		},
		match: function(toMatchSymbol) {
			if (lookAheadToken.value === toMatchSymbol) {
				this.consume();
			} else {
				throw new Error("Parser: Syntax error detected at match. Expected "	+ toMatchSymbol + " but got " + lookAheadToken.value);
			}
		},
		consume: function() {
			this.loadNextToken();
		},
		loadNextToken: function() {
			if(!this.isEndOfInput())
				lookAheadToken = lexer.nextToken();
		},
		isEndOfInput: function() {
			return lookAheadToken.type === TokenTypes.EOI;
		}
	}
})();