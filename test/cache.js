'use strict';

var test = require('tape');
var vm = require('vm');

test('does cache', function(t) {
	t.plan(1);

	delete require.cache[require.resolve('../')];
	var getBootstrapNode = require('../');

	var runInDebugContext = vm.runInDebugContext;

	getBootstrapNode();

	vm.runInDebugContext = function() {
		return {
			scripts: function() {
				t.fail('Checking the scripts again.');
				return [];
			}
		};
	};

	getBootstrapNode();

	t.pass('Did not check the scripts again.');

	vm.runInDebugContext = runInDebugContext;
});
