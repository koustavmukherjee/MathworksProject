Lexer = (function(input) {
	var lineNumber = 0;
	var curCharacterPosition = 0;
	var lookAheadCharacter = ''; //looking ahead 1 character at a time
	return {
		lookAhead: function() {
			return lookAheadCharacter;
		},
		isEndOfInput: function() {
			return curCharacterPosition === input.length;
		},
		getLineNumber: function() {
			return lineNumber;
		},
		getCurrentInputPosition: function() {
			return curCharacterPosition;
		},
		consume: function() {
			curCharacterPosition++;
			if(!this.isEndOfInput()) {
				lookAheadCharacter = input.charAt(curCharacterPosition);
			}
		},
		isIdentifier: function(ch) {
			return /[a-zA-Z0-9_]/.test(ch);
		},
		identifier: function() {
			var buffer = '';
			var startPosition = this.curCharacterPosition;
			while(isIdentifier(this.lookAhead()) {
				buffer += this.lookAhead();
				this.consume();
			}
			if(typeof Keywords[buffer] !== undefined)
				return new Token(TokenTypes.KEY_WORD, buffer, this.curCharacterPosition);
			else
				return new Token(TokenTypes.IDENTIFIER, buffer, this.curCharacterPosition);
		},
		nextToken: function() {
			int startPosition = this.getCurrentInputPosition();
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
			else if(/\s/.test(this.lookAhead())) {
				if(this.lookAhead() === '\n')
					lineNumber++;
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