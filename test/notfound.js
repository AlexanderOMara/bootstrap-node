'use strict';

var test = require('tape');
var vm = require('vm');

test('not found throws', function(t) {
	t.plan(1);

	delete require.cache[require.resolve('../')];
	var getBootstrapNode = require('../');

	var runInDebugContext = vm.runInDebugContext;

	vm.runInDebugContext = function() {
		return {
			scripts: function() {
				return [];
			}
		};
	};

	try {
		getBootstrapNode();
	}
	catch (ex) {
		t.pass('Error thrown.');
	}

	vm.runInDebugContext = runInDebugContext;
});
