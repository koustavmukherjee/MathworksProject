Properties = window.Properties || {};
Properties.constants = (function() {
	return {
		propertyTunableEnum: {
			0: '', //TUNABLE
			1: 'Nontunable'
		},
		
		propertyTunableReverseEnum: {
			'Nontunable': 1
		},

		propertyTypeEnum: {
			0: '', //NUMERIC
			1: 'Logical',
			2: 'PositiveInteger'
		},

		propertyTypeReverseEnum: {
			'Logical': 1,
			'PositiveInteger': 2
		},

		accessSpecifierEnum: {
			0: '', //PUBLIC
			1: 'private',
			2: 'protected',
			3: 'immutable',
		},
		
		accessSpecifierReverseEnum: {
			'public': 0,
			'private': 1,
			'protected': 2,
			'immutable': 3
		},
		
		constantEnum: {
			0: '', //NOT CONSTANT
			1: 'Constant'
		},

		constantReverseEnum: {
			'Constant': 1
		},

		hiddenEnum: {
			0: '', //NOT HIDDEN
			1: 'Hidden'
		},

		hiddenReverseEnum: {
			'Hidden': 1
		}
	}
})();