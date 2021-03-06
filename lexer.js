Lexer = (function() {
	var lineNumber = 1;
	var charNumber = 1;
	var curCharacterPosition = 0;
	var lookAheadCharacter = ''; //looking ahead 1 character at a time
	var input = '';
	return {
		initialize: function(inp) {
			input = inp;
			curCharacterPosition = 0;
			lineNumber = 1;
			charNumber = 1;
			if(!this.isEndOfInput()) {
				lookAheadCharacter = inp[curCharacterPosition];
			}
		},
		getInput: function() {
			return input;
		},
		lookAhead: function() {
			return lookAheadCharacter;
		},
		isEndOfInput: function() {
			return curCharacterPosition === input.length;
		},
		getLineNumber: function() {
			return lineNumber;
		},
		setLineNumber: function(lineNo) {
			lineNumber = lineNo;
			charNumber = 1;
		},
		getCharNumber: function() {
			return charNumber;
		},
		getCurrentInputPosition: function() {
			return curCharacterPosition;
		},
		setCurrentInputPosition: function(position) {
			curCharacterPosition = position;
		},
		consume: function() {
			curCharacterPosition++;
			charNumber++;
			if(!this.isEndOfInput()) {
				lookAheadCharacter = input.charAt(curCharacterPosition);
			}
		},
		isIdentifier: function(ch) {
			return /[a-zA-Z0-9_.]/.test(ch);
		},
		identifier: function() {
			var buffer = '';
			var startPosition = this.curCharacterPosition;
			while(this.isIdentifier(this.lookAhead()) && !this.isEndOfInput()) {
				buffer += this.lookAhead();
				this.consume();
			}
			if(typeof Keywords[buffer] !== 'undefined')
				return new Token(TokenTypes.KEY_WORD, buffer, this.curCharacterPosition);
			else
				return new Token(TokenTypes.IDENTIFIER, buffer, this.curCharacterPosition);
		},
		nextToken: function() {
			var startPosition = this.getCurrentInputPosition();
			if(this.lookAhead() === '(') {
				this.consume();
				return new Token(window.TokenTypes.LPAREN, '(', startPosition);
			}
			else if(this.lookAhead() === ')') {
				this.consume();
				return new Token(window.TokenTypes.RPAREN, ')', startPosition);
			}
			else if(this.lookAhead() === ',') {
				this.consume();
				return new Token(window.TokenTypes.COMMA, ',', startPosition);
			}
			else if(this.lookAhead() === '=') {
				this.consume();
				return new Token(window.TokenTypes.EQUALS, '=', startPosition);
			}
			else if(this.lookAhead() === '\n') {
				lineNumber++;
				charNumber = 1;
				this.consume();
				return new Token(window.TokenTypes.NEW_LINE, '\n', startPosition);	
			}
			else if(this.lookAhead() === '<') {
				this.consume();
				return new Token(window.TokenTypes.LESS_THAN, '<', startPosition);	
			}
			else if(this.lookAhead() === '{') {
				this.consume();
				return new Token(window.TokenTypes.LCURLBRAC, '{', startPosition);	
			}
			else if(this.lookAhead() === '}') {
				this.consume();
				return new Token(window.TokenTypes.RCURLBRAC, '}', startPosition);	
			}
			else if(this.lookAhead() === '\'') {
				this.consume();
				return new Token(window.TokenTypes.QUOTE, '\'', startPosition);	
			}
			else if(this.lookAhead() === '[') {
				this.consume();
				return new Token(window.TokenTypes.LSQBRAC, '[', startPosition);	
			}
			else if(this.lookAhead() === ']') {
				this.consume();
				return new Token(window.TokenTypes.RSQBRAC, ']', startPosition);	
			}
			else if(/\s/.test(this.lookAhead())) {
				this.consume();
				return this.nextToken();
			}
			else if(this.isIdentifier()) {
				return this.identifier();
			}
			else if(this.isEndOfInput()) {
				return new Token(window.TokenTypes.EOI, 'EOI', startPosition);
			}
			else {
				throw new Error('Invalid token encountered at line : ' + lineNumber + ', and position : ' + curCharacterPosition);
			}
		}
	}
})();