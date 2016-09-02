# bootstrap-node

Get the Node bootstrap script source.


## Overview

Node exposes a lot of internal modules, but the main bootstrap script `bootstrap_node.js` (formerly `node.js`) simply isn't one of them. For most uses, that's probably not an issue, but my uses aren't most people's uses, and so this module was born.

This module utilizes the `Debug` object through the `vm` module, and finds the bootstrap script in the loaded scripts.


## Usage

Just require the `module`, and call the returned function to get the node bootstrap scripts source as a string.

```js
var getBootstrapNode = require('bootstrap-node');
var bootstrapNode = getBootstrapNode();
console.log(bootstrapNode);
```

The module caches the script on first call so there is no need to worry about performance issues from calling it multiple times.

Note: If for any reason it should fail to find it, an `Error` will be thrown.


## Compatibility

Should work in any remotely recent versions of Node. If the Debug API is available back that far, it should match the script all the way back to Node 0.1.27.


## Bugs

If you find a bug or have compatibility issues, please open a ticket under issues section for this repository.


## License

Copyright (c) 2015 Alexander O'Mara

Licensed under the Mozilla Public License, v. 2.0.

If this license does not work for you, feel free to contact me.


## Donations

If you find my software useful, please consider making a modest donation on my website at [alexomara.com](http://alexomara.com).
