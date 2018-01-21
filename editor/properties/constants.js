Properties = window.Properties || {};
Properties.constants = (function() {
	return {
		propertyTunableEnum: {
			0: '', //TUNABLE
			1: 'Nontunable'
		},

		propertyTypeEnum: {
			0: '', //NUMERIC
			1: 'Logical',
			2: 'PositiveInteger'
		},

		accessSpecifierEnum: {
			0: '', //PUBLIC
			1: 'private',
			2: 'protected',
			3: 'immutable'
		},

		constantEnum: {
			0: '', //NOT CONSTANT
			1: 'Constant'
		},

		hiddenEnum: {
			0: '', //NOT HIDDEN
			1: 'Hidden'
		}
	}
})();