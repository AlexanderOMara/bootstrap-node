'use strict';

var test = require('tape');
var vm = require('vm');

var pass = [
	'(function(process) { /* body */ })',
	'(function(process) {\n//\n\n//\n\n//\n\n//\n})',
	'(function(process) {})',
	'(function (process){})',
	';;;;;;;;;;(function (process){});;;;;;;;;;',
	'//\n//\n//\n//\n\n\n(function (process){})',
	'//-\n//-\n//-\n//-\n\n\n(function (process){})',
	'/**//**//**//**/(function (process){})',
	'/*-*//*-*//*-*//*-*/(function (process){})',
	'"use strict";(function (process){})',
	"'use strict';(function (process){})",
	'"use strict";\'use strict\';(function (process){})',
	'//\n/**/\n"use strict";(function (process){})',
	'\r\n\t \r\n\t (function(process) {})\r\n\t \r\n\t ',
	'(\r\n\t \r\n\t function(process) {}\r\n\t \r\n\t )',
	'(function\r\n\t \r\n\t (process)\r\n\t \r\n\t {})',
	'(function(\r\n\t \r\n\t process\r\n\t \r\n\t ){})'
];

var fail = [
	'',
	'lol',
	'"garbage";(function(process) {})',
	'function(process) {}',
	'function process() {}',
	'(function(process) {});"use strict"'
];

var dummyRunInDebug = function(source) {
	return function() {
		return {
			scripts: function() {
				return [{
					name: 'bootstrap_node.js',
					source: source
				}];
			}
		};
	};
};

test('sources pass', function(t) {
	var l = pass.length;
	t.plan(l);

	for (var i = 0; i < l; i++) {
		var entry = pass[i];

		delete require.cache[require.resolve('../')];
		var getBootstrapNode = require('../');

		var runInDebugContext = vm.runInDebugContext;

		vm.runInDebugContext = dummyRunInDebug(entry);

		var encoded = JSON.stringify(entry);

		try {
			var source = getBootstrapNode();
			t.equal(source, entry, 'Passed: ' + encoded);
		}
		catch (ex) {
			t.fail('Failed: ' + encoded);
		}

		vm.runInDebugContext = runInDebugContext;
	}
});

test('sources fail', function(t) {
	var l = fail.length;
	t.plan(l);

	for (var i = 0; i < l; i++) {
		var entry = fail[i];

		delete require.cache[require.resolve('../')];
		var getBootstrapNode = require('../');

		var runInDebugContext = vm.runInDebugContext;

		vm.runInDebugContext = dummyRunInDebug(entry);

		var encoded = JSON.stringify(entry);

		try {
			getBootstrapNode();
			t.fail('Passed: ' + encoded);
		}
		catch (ex) {
			t.pass('Failed: ' + encoded);
		}

		vm.runInDebugContext = runInDebugContext;
	}
});
