'use strict';

/*
    Sourcemarket: de_DE
*/

require.config({
    baseUrl : 'js/',
    paths: {

        // vendor
        'modernizr': 'lib/modernizr/modernizr',
        'jquery': 'lib/jquery/jquery',
        'underscore': 'lib/underscore/underscore',
        'i18n': 'lib/requirejs-i18n/i18n',

        // locale-specific settings
        'settings' : 'settings',

        // core modules
        'core': 'core/core',

        // locale-specific modules
        'search': 'modules/search/search'
        
    },
	i18n: {
		locale: 'de_DE'
	}
});

require([
    'modernizr',
    'jquery',
    'underscore',
    'settings',
    'core'
    ], function(Modernizr, $, _, settings, core) { 

        if (Modernizr) {
            console.log('Modernizr loaded');
            console.log(Modernizr);
        }

        if ($) {
            console.log('jQuery loaded');
            console.log(jQuery);
        }

        if (_) {
            console.log('Underscore loaded');
            console.log(_);
        }

        if (settings) {
            console.log('Settings loaded');
            console.log(settings);
        }

        if (core) {
            console.log('Core loaded');
            console.log('core.utils.add(2,2) = ' + core.utils.add(2,2));
        }   

});