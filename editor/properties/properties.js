Properties = (function(){
	return {
		//Closures to generate property name
		propertyNameGenerator: (function () {
		    var counter = 0;
		    return function () {
		    	counter += 1;
		    	return 'Property' + counter;
		    }
		})(),
		
		stateNameGenerator: (function () {
		    var counter = 0;
		    return function () {
		    	counter += 1;
		    	return 'State' + counter;
		    }
		})(),

		getPropertyGroupHeader: function(propertyGroupIdentifier) {
			var propertyHeader = 'properties';
			if(propertyGroupIdentifier === '00000000') return propertyHeader;
			propertyHeader += '(';
			
			if(propertyGroupIdentifier[0] === propertyGroupIdentifier[1]) {
				if(propertyGroupIdentifier[0] !== '0')
					propertyHeader += 'Access = '+ Properties.constants.accessSpecifierEnum[propertyGroupIdentifier[0]];
			}

			else {
				if(propertyGroupIdentifier[0] !== '0')
					propertyHeader += 'SetAccess = '+ Properties.constants.accessSpecifierEnum[propertyGroupIdentifier[0]];
				if(propertyGroupIdentifier[1] !== '0')
					propertyHeader += 'GetAccess = '+ Properties.constants.accessSpecifierEnum[propertyGroupIdentifier[1]];
			}

			for(var i = 2; i < propertyGroupIdentifier.length; i++) {
				var ch = propertyGroupIdentifier.charAt(i);
				var propertyArgument = '';
				switch(i) {
					case 2: 	propertyArgument = Properties.constants.propertyTunableEnum[ch];
								break;
					case 3: 	ch == Properties.constants.propertyTypeReverseEnum['StringSet'] ? propertyArgument = '' : propertyArgument = Properties.constants.propertyTypeEnum[ch];
								break;
					case 4: 	propertyArgument = Properties.constants.constantEnum[ch];
								break;
					case 5: 	propertyArgument = Properties.constants.hiddenEnum[ch];
								break;
					case 6: 	propertyArgument = Properties.constants.discreteStateEnum[ch];
								break;
					case 7: 	propertyArgument = Properties.constants.dependentEnum[ch];
								break;
					default: 	ch += '';
								break;
				}
				if(propertyArgument !== '') {
					if(propertyHeader.charAt(propertyHeader.length - 1) !== '(') {
						propertyHeader += ',';
					}
					propertyHeader += propertyArgument;
				}
			}
			propertyHeader += ')';
			return propertyHeader;
		}
	}
})();