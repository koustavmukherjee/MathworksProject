TokenTypes = (function() {
	return {
		LPAREN: 1,
		RPAREN: 2,
		COMMA: 3,
		EQUALS: 4,
		WHITE_SPACE: 5,
		NEW_LINE: 6,
		PROPERTIES: 7,
		ACCESS: 8,
		KEY_WORD: 9,
		IDENTIFIER: 10,
		/*
		SET_ACCESS: 9,
		GET_ACCESS: 10,
		PUBLIC: 11,
		PRIVATE: 12,
		PROTECTED: 13,
		IMMUTABLE: 14,
		CONSTANT: 15,
		HIDDEN: 16,
		NON_TUNABLE: 17,
		LOGICAL: 18,
		POSITIVE_INTEGER: 19,
		*/
		EOI: 20
	}
})();
/*
if (/[a-zA-Z0-9-_ ]/.test(inp))
    alert("input was a letter, number, hyphen, underscore or space");
*/