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
			var methodGroups = {};
			var Groups = {};
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
					else if(lookAheadToken.value === 'methods') {
						this.parseMethods(methodGroups);
						classDef.methodGroups = methodGroups;
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
		parseMethods: function(methodGroups) {
			this.match('methods');
			var methodAccessType = '';
			if(lookAheadToken.type === TokenTypes.NEW_LINE) {
				methodAccessType = Properties.constants.accessSpecifierReverseEnum['public'];
			}
			else {
				this.match('(');
				this.match('Access');
				this.match('=');
				if(typeof Properties.constants.accessSpecifierReverseEnum[lookAheadToken.value] === 'undefined')
					this.displayErrorMessage('valid access specifier');
				else {
					methodAccessType = Properties.constants.accessSpecifierReverseEnum[lookAheadToken.value];
					this.match(lookAheadToken.value);
					this.match(')')
				}
			}
			if(typeof methodAccessType !== 'undefined' && methodAccessType !== '') {
				if(typeof methodGroups[methodAccessType] === 'undefined')
					methodGroups[methodAccessType] = new Method(methodAccessType, []);
				while(lookAheadToken.value !== 'end') {
					if(lookAheadToken.value === 'function') {
						this.parseFunction(methodGroups[methodAccessType]);
					}
					else if(lookAheadToken.type === TokenTypes.NEW_LINE) {
						this.match('\n');
					}
				}
				this.match('end')
			}
		},
		parseFunction: function(method) {
			this.match('function');
			var fn = new Fn();
			if(lookAheadToken.type === TokenTypes.LSQBRAC) {
				fn.outputs = [];
				this.match('[');
				if(lookAheadToken.type === TokenTypes.IDENTIFIER) {
					fn.outputs.push(lookAheadToken.value);
				}
				else {
					this.displayErrorMessage('valid output parameter');
				}
				this.match(lookAheadToken.value);
				while(lookAheadToken.type === TokenTypes.COMMA) {
					match(',');
					if(lookAheadToken.type === TokenTypes.IDENTIFIER) {
						fn.outputs.push(lookAheadToken.value);
					}
					else {
						this.displayErrorMessage('valid output parameter');
					}
				}
				this.match(']');
				this.match('=');
				if(lookAheadToken.type === TokenTypes.IDENTIFIER) {
					fn.name(lookAheadToken.value);
					this.match(lookAheadToken.value);
				}
				else {
					this.displayErrorMessage('valid function name');
				}
				this.parseFunctionparameters(fn);
				var currentCharacterPosition = lexer.getCurrentInputPosition();
				this.match('\n');
				lexer.setCurrentInputPosition(currentCharacterPosition + 1);
				this.parseFunctionBody(fn);
				method.addFunction(fn);
			}
			else if(lookAheadToken.type === TokenTypes.IDENTIFIER) {
				var name = lookAheadToken.value;
				this.match(lookAheadToken.value);
				if(lookAheadToken.type === TokenTypes.EQUALS) {
					fn.outputs = [name];
					this.match('=');
					if(lookAheadToken.type === TokenTypes.IDENTIFIER) {
						fn.name = lookAheadToken.value;
					}
					else {
						this.displayErrorMessage('valid function name');
					}
				}
				else {
					fn.name = name;
				}
				this.match(lookAheadToken.value);
				this.parseFunctionparameters(fn);
				var currentCharacterPosition = lexer.getCurrentInputPosition();
				this.match('\n');
				lexer.setCurrentInputPosition(currentCharacterPosition + 1);
				this.parseFunctionBody(fn);
				method.addFunction(fn);
			}
			else {
				this.displayErrorMessage('valid function signature');
			}
		},
		parseFunctionparameters: function(fn) {
			this.match('(');
			fn.parameters = [];
			if(lookAheadToken.type === TokenTypes.IDENTIFIER) {
				fn.parameters.push(lookAheadToken.value);
				this.match(lookAheadToken.value);
			}
			else {
				this.displayErrorMessage('valid function argument');
			}
			while(lookAheadToken.type === TokenTypes.COMMA) {
				this.match(',');
				if(lookAheadToken.type === TokenTypes.IDENTIFIER) {
					fn.parameters.push(lookAheadToken.value);
					this.match(lookAheadToken.value);
				}
				else {
					this.displayErrorMessage('valid function argument');
				}
			}
			this.match(')');
		},
		parseFunctionBody: function(fn) {
			var remainingCode = lexer.getInput().substr(lexer.getCurrentInputPosition() - 1);
			fn.body = remainingCode.substr(0, remainingCode.match(/\n[\s]*end\n/).index);
			lexer.setCurrentInputPosition(lexer.getCurrentInputPosition() + fn.body.length - 2);
			lexer.setLineNumber(lexer.getLineNumber() + (fn.body.match(new RegExp("\n", "g")) || []).length);
			lexer.consume();
			this.loadNextToken();
			this.match('\n');
			this.match('end');
			this.match('\n');
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
			else if(typeof Properties.constants.discreteStateReverseEnum[lookAheadToken.value] !== 'undefined') {
				propertyHeader.isDiscreteState = Properties.constants.discreteStateReverseEnum[lookAheadToken.value];
				this.consume(lookAheadToken.value);
			}
			else if(typeof Properties.constants.dependentReverseEnum[lookAheadToken.value] !== 'undefined') {
				propertyHeader.isDependent = Properties.constants.dependentReverseEnum[lookAheadToken.value];
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
					if(lookAheadToken.value === 'matlab.system.StringSet') {
						this.match('matlab.system.StringSet');
						this.match('(');
						this.match('{');
						this.match('\'');
						var propertyValues = [];
						if(lookAheadToken.type === TokenTypes.IDENTIFIER) {
							propertyValues.push(lookAheadToken.value);
							this.match(lookAheadToken.value)
							this.match('\'');
							while(lookAheadToken.type === TokenTypes.COMMA) {
								this.match(',');
								this.match('\'');
								propertyValues.push(lookAheadToken.value);
								this.match(lookAheadToken.value)
								this.match('\'');
							}
						}
						this.match('}');
						this.match(')');
						property.value = propertyValues;
						property.type = Properties.constants.propertyTypeReverseEnum['StringSet'];
					}
					else {
						var propertyValue = lookAheadToken.value;
						property.value = propertyValue;
						this.match(propertyValue);
						property.type = propertyHeader.type;
					}
				}
				property.getAccess = propertyHeader.getAccess;
				property.setAccess = propertyHeader.setAccess;
				property.isTunable = propertyHeader.isTunable;
				property.isConstant = propertyHeader.isConstant;
				property.isHidden = propertyHeader.isHidden;
				property.isDiscreteState = propertyHeader.isDiscreteState;
				property.isDependent = propertyHeader.isDependent;
				return property;
			}
		},
		match: function(toMatchSymbol) {
			if (lookAheadToken.value === toMatchSymbol) {
				this.consume();
			} else {
				$("#compile-failure-message").html("Syntax Error :  Expected "	+ toMatchSymbol + " but got " + lookAheadToken.value + ' at line : ' + lexer.getLineNumber() + ':' + lexer.getCharNumber());
				$("#compile-failure").fadeTo(5000, 500).slideUp(500, function(){
               		$("#compile-failure").slideUp(500);
                });
				throw new Error("Parser: Syntax error detected at match. Expected "	+ toMatchSymbol + " but got " + lookAheadToken.value + ' at ' + lexer.getLineNumber() + ':' + lexer.getCharNumber());
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
		},
		displayErrorMessage(expectedidentifier) {
			$("#compile-failure-message").html("Syntax Error :  Expected "	+ expectedidentifier + " but got " + lookAheadToken.value + ' at line : ' + lexer.getLineNumber() + ':' + lexer.getCharNumber());
			$("#compile-failure").fadeTo(5000, 500).slideUp(500, function(){
           		$("#compile-failure").slideUp(500);
            });
            throw new Error("Parser: Syntax error detected at match. Expected "	+ expectedidentifier + " but got " + lookAheadToken.value + ' at ' + lexer.getLineNumber() + ':' + lexer.getCharNumber());
		}
	}
})();