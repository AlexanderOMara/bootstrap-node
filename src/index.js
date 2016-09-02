/*!
 * bootstrap-node
 * @version 1.0.0
 * @author Alexander O'Mara
 * @copyright Copyright (c) 2016 Alexander O'Mara
 * @license MPL 2.0 <http://mozilla.org/MPL/2.0/>
 */

'use strict';

var trimHeader =
	/^((\/\/[^\n\r]*)|(\/\*[\s\S]*?\*\/)|\s|;|(['"]use\x20strict['"]))*/;

var trimFooter =
	/((\/\/[^\n\r]*)|(\/\*[\s\S]*?\*\/)|\s|;)*$/;

var matchBody =
	/^\(\s*function\s*\(\s*process\s*\)\s*{[\s\S]*}\s*\)$/;

var cache = null;

/**
 * Get the Node bootstrap script source.
 *
 * @throws Error - If script not found.
 * @returns {string} - Script source.
 */
function getBootstrapNode() {
	// Use the cache if already found.
	if (cache) {
		return cache;
	}

	// Get the debug object.
	var Debug = require('vm').runInDebugContext('Debug');

	// Use the debug object to list all of the scripts.
	// It is only possible to get the scripts is a listener is set.
	// However, we do not want to replace any existing listeners.
	// First try to get the scripts without setting a litener.
	// If it fails, then there must be not be any listener set.
	// Set listener temporarily, get the scripts, and unset.
	var scripts;
	try {
		scripts = Debug.scripts();
	}
	catch (ex) {
		Debug.setListener(function() {});
		scripts = Debug.scripts();
		Debug.setListener(null);
	}

	// Now find the script in whole the list.
	for (var i = scripts.length; i--;) {
		var script = scripts[i];
		var name = script.name;

		// Check the script name, ignore if not a known name.
		if (
			name !== 'bootstrap_node.js' &&
			name !== 'node.js'
		) {
			continue;
		}

		// Get the script source.
		var source = script.source;

		// Get the body of the code.
		var body = source
			.replace(trimHeader, '')
			.replace(trimFooter, '');

		// Check if the body matches and cache it.
		if (matchBody.test(body)) {
			cache = source;
			break;
		}
	}

	// Throw if not found.
	if (!cache) {
		throw new Error('Node bootstrap script was not found.');
	}

	return cache;
}

module.exports = getBootstrapNode;
