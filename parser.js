Parser = (function(input) {
	var lookAheadToken = ''; //looking ahead 1 character at a time
	var lexer = window.Lexer(input);
	return {
		parse: function() {
			lookAheadToken = lexer.nextToken();
		},
		parseClassDef: function() {

		},
		parseProperties: function() {
			consume('properties');
			propertyHeader = new PropertyHeader();
			if(lookAheadToken.type === TokenTypes.NEW_LINE) {
				/*
				propertyHeader.type = 0;
				propertyHeader.getAccess = 0;
				propertyHeader.setAccess = 0;
				propertyHeader.isTunable = 0;
				propertyHeader.isConstant = 0;
				propertyHeader.isHidden = 0;
				*/
				processProperties();
			}
			else {
				parsePropertyHeader(propertyHeader);
			}
			consume('end');
			return propertyHeader;
		},
		parsePropertyHeader: function(propertyHeader) {
			this.match('(');
			this.processPropertyHeaderTerms(propertyHeader);
			while(lookAhead.type === TokenTypes.COMMA) {
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
			if(typeof Properties.constants.accessSpecifierReverseEnum[rhs.value] === 'undefined') {
				throw new Error("Parser: Syntax error detected at parse property header. Expected valid access specifier but encountered " + rhs.value);
			}
			else {
				if(lhs.value === 'Access') {
					propertyHeader.getAccess = Properties.constants.accessSpecifierReverseEnum[rhs.value];
					propertyHeader.setAccess = Properties.constants.accessSpecifierReverseEnum[rhs.value];
				}
				else if(lhs.value === 'GetAccess') {
					propertyHeader.getAccess = Properties.constants.accessSpecifierReverseEnum[rhs.value];
				}
				else if(lhs.value === 'SetAccess') {
					propertyHeader.setAccess = Properties.constants.accessSpecifierReverseEnum[rhs.value];
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
			}
			else if(typeof Properties.constants.propertyTypeReverseEnum[lookAheadToken.value] !== 'undefined') {
				propertyHeader.type = Properties.constants.propertyTypeReverseEnum[lookAheadToken.value];
			}
			else if(typeof Properties.constants.constantReverseEnum[lookAheadToken.value] !== 'undefined') {
				propertyHeader.isConstant = Properties.constants.constantReverseEnum[lookAheadToken.value];
			}
			else if(typeof Properties.constants.hiddenReverseEnum[lookAheadToken.value] !== 'undefined') {
				propertyHeader.isHidden = Properties.constants.hiddenReverseEnum[lookAheadToken.value];
			}
			else {
				throw new Error("Parser: Syntax error detected at parse property header. Unexpected Keyword encountered " + lookAheadToken.value);
			}
		},
		parseProperty: function() {

		},
		lookAhead: function() {

		},
		match: function(toMatchSymbol) {
			if (lookAheadToken.value === toMatchSymbol) {
				consume();
			} else {
				throw new Error("Parser: Syntax error detected at match. Expected "	+ toMatchSymbol + " but got " + lookAheadToken.value);
			}
		},
		consume: function() {
			this.loadNextToken();
		},
		loadNextToken: function() {
			if(!isEndOfInput())
				lookAheadToken = lexer.nextToken();
		},
		isEndOfInput: function() {
			return lookAheadToken.type === TokenTypes.EOI;
		}
	}
})();