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

		getPropertyGroupHeader: function(propertyGroupIdentifier) {
			var propertyHeader = 'properties';
			if(propertyGroupIdentifier === '000000') return propertyHeader;
			propertyHeader += '(';
			
			if(propertyGroupIdentifier[0] === propertyGroupIdentifier[1]) {
				if(propertyGroupIdentifier[0] !== '0')
					propertyHeader += 'Access = '+ accessSpecifierEnum(propertyGroupIdentifier[0]);
			}

			else {
				if(propertyGroupIdentifier[0] !== '0')
					propertyHeader += 'SetAccess = '+ accessSpecifierEnum(propertyGroupIdentifier[0]);
				if(propertyGroupIdentifier[1] !== '0')
					propertyHeader += 'GetAccess = '+ accessSpecifierEnum(propertyGroupIdentifier[1]);
			}

			for(var i = 2; i < propertyGroupIdentifier.length; i++) {
				var ch = propertyGroupIdentifier.charAt(i);
				var propertyArgument = '';
				switch(i) {
					case 2: 	propertyArgument = Properties.constants.propertyTunableEnum[ch];
								break;
					case 3: 	propertyArgument = Properties.constants.propertyTypeEnum[ch];
								break;
					case 4: 	propertyArgument = Properties.constants.constantEnum[ch];
								break;
					case 5: 	propertyArgument = Properties.constants.hiddenEnum[ch];
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