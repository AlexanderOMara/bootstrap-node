'use strict';

var test = require('tape');
var vm = require('vm');

var emptyObject = function() {
	return Object.create ? Object.create(null) : {__proto__: null};
};

test('current', function(t) {
	t.plan(2);

	delete require.cache[require.resolve('../')];
	var getBootstrapNode = require('../');

	// Get the script source.
	var script = getBootstrapNode();

	// Source should be string.
	t.equal(typeof script, 'string', 'Script string.');

	// Run the code too.
	var compiled = vm.runInNewContext(script, vm.createContext(emptyObject()));

	// Should produce a function.
	t.equal(typeof compiled, 'function', 'Code creates a function.');
});
