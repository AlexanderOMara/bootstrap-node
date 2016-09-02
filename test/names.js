'use strict';

var test = require('tape');
var vm = require('vm');

test('name bootstrap_node.js', function(t) {
	t.plan(1);

	delete require.cache[require.resolve('../')];
	var getBootstrapNode = require('../');

	var runInDebugContext = vm.runInDebugContext;

	vm.runInDebugContext = function() {
		return {
			scripts: function() {
				return [{
					name: 'bootstrap_node.js',
					source: '(function (process){})'
				}];
			}
		};
	};

	try {
		getBootstrapNode();
		t.pass('Found bootstrap_node.js');
	}
	catch (ex) {
		t.fail('Filed bootstrap_node.js');
	}

	vm.runInDebugContext = runInDebugContext;
});

test('name node.js', function(t) {
	t.plan(1);

	delete require.cache[require.resolve('../')];
	var getBootstrapNode = require('../');

	var runInDebugContext = vm.runInDebugContext;

	vm.runInDebugContext = function() {
		return {
			scripts: function() {
				return [{
					name: 'node.js',
					source: '(function (process){})'
				}];
			}
		};
	};

	try {
		getBootstrapNode();
		t.pass('Found node.js');
	}
	catch (ex) {
		t.fail('Filed node.js');
	}

	vm.runInDebugContext = runInDebugContext;
});

test('name fail', function(t) {
	t.plan(1);

	delete require.cache[require.resolve('../')];
	var getBootstrapNode = require('../');

	var runInDebugContext = vm.runInDebugContext;

	vm.runInDebugContext = function() {
		return {
			scripts: function() {
				return [{
					name: 'lol.js',
					source: '(function (process){})'
				}];
			}
		};
	};

	try {
		getBootstrapNode();
		t.fail('Should have throw error.');
	}
	catch (ex) {
		t.pass('Not found as expected.');
	}

	vm.runInDebugContext = runInDebugContext;
});
