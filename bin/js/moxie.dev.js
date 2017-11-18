;var MXI_DEBUG = true;
/**
 * mOxie - multi-runtime File API & XMLHttpRequest L2 Polyfill
 * v1.5.7
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 *
 * Date: 2017-11-03
 */
/**
 * Inline development version. Only to be used while developing since it uses document.write to load scripts.
 */

/*jshint smarttabs:true, undef:true, latedef:true, curly:true, bitwise:true, camelcase:true */
/*globals $code */

(function(exports) {
	"use strict";

	var html = "", baseDir;
	var modules = {}, exposedModules = [], moduleCount = 0;

	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
		var src = scripts[i].src;

		if (src.indexOf('/moxie.dev.js') != -1) {
			baseDir = src.substring(0, src.lastIndexOf('/'));
		}
	}

	function require(ids, callback) {
		var module, defs = [];

		for (var i = 0; i < ids.length; ++i) {
			module = modules[ids[i]] || resolve(ids[i]);
			if (!module) {
				throw 'module definition dependecy not found: ' + ids[i];
			}

			defs.push(module);
		}

		callback.apply(null, defs);
	}

	function resolve(id) {
		var target = exports;
		var fragments = id.split(/[.\/]/);

		for (var fi = 0; fi < fragments.length; ++fi) {
			if (!target[fragments[fi]]) {
				return;
			}

			target = target[fragments[fi]];
		}

		return target;
	}

	function register(id) {
		var target = exports;
		var fragments = id.split(/[.\/]/);

		for (var fi = 0; fi < fragments.length - 1; ++fi) {
			if (target[fragments[fi]] === undefined) {
				target[fragments[fi]] = {};
			}

			target = target[fragments[fi]];
		}

		target[fragments[fragments.length - 1]] = modules[id];
	}

	function define(id, dependencies, definition) {
		if (typeof id !== 'string') {
			throw 'invalid module definition, module id must be defined and be a string';
		}

		if (dependencies === undefined) {
			throw 'invalid module definition, dependencies must be specified';
		}

		if (definition === undefined) {
			throw 'invalid module definition, definition function must be specified';
		}

		require(dependencies, function() {
			modules[id] = definition.apply(null, arguments);
		});

		if (--moduleCount === 0) {
			for (var i = 0; i < exposedModules.length; i++) {
				register(exposedModules[i]);
			}
		}
	}

	function defined(id) {
		return !!modules[id];
	}

	function expose(ids) {
		exposedModules = ids;
	}

	function writeScripts() {
		document.write(html);
	}

	function load(path) {
		html += '<script type="text/javascript" src="' + baseDir + '/' + path + '"></script>\n';
		moduleCount++;
	}

	// Expose globally
	exports.define = define;
	exports.defined = defined;
	exports.require = require;

	expose(["moxie/core/utils/Basic","moxie/core/utils/Env","moxie/core/I18n","moxie/core/utils/Mime","moxie/core/utils/Dom","moxie/core/Exceptions","moxie/core/EventTarget","moxie/runtime/Runtime","moxie/runtime/RuntimeClient","moxie/file/FileInput","moxie/core/utils/Encode","moxie/file/Blob","moxie/file/File","moxie/file/FileDrop","moxie/file/FileReader","moxie/file/FileReaderSync","moxie/core/utils/Url","moxie/runtime/RuntimeTarget","moxie/xhr/FormData","moxie/xhr/XMLHttpRequest","moxie/runtime/Transporter","moxie/image/Image","moxie/runtime/html5/Runtime","moxie/core/utils/Events","moxie/runtime/html5/file/FileInput","moxie/runtime/html5/file/FileDrop","moxie/runtime/html5/file/FileReader","moxie/runtime/html5/utils/BinaryReader","moxie/runtime/html5/image/JPEGHeaders","moxie/runtime/html5/image/ExifParser","moxie/runtime/html5/image/JPEG","moxie/runtime/html5/image/PNG","moxie/runtime/html5/image/ImageInfo","moxie/runtime/html5/image/ResizerCanvas","moxie/runtime/html5/image/Image","moxie/runtime/html5/xhr/XMLHttpRequest","moxie/core/utils/Loader","moxie/runtime/googledrive/Runtime","moxie/runtime/googledrive/file/FileInput","moxie/runtime/googledrive/file/FileReader","moxie/runtime/googledrive/xhr/XMLHttpRequest","moxie/runtime/dropbox/Runtime","moxie/runtime/dropbox/file/FileInput","moxie/runtime/dropbox/file/FileReader","moxie/runtime/dropbox/xhr/XMLHttpRequest"]);

	load('../../src/javascript/core/utils/Basic.js');
	load('../../src/javascript/core/utils/Env.js');
	load('../../src/javascript/core/I18n.js');
	load('../../src/javascript/core/utils/Mime.js');
	load('../../src/javascript/core/utils/Dom.js');
	load('../../src/javascript/core/Exceptions.js');
	load('../../src/javascript/core/EventTarget.js');
	load('../../src/javascript/runtime/Runtime.js');
	load('../../src/javascript/runtime/RuntimeClient.js');
	load('../../src/javascript/file/FileInput.js');
	load('../../src/javascript/core/utils/Encode.js');
	load('../../src/javascript/file/Blob.js');
	load('../../src/javascript/file/File.js');
	load('../../src/javascript/file/FileDrop.js');
	load('../../src/javascript/file/FileReader.js');
	load('../../src/javascript/file/FileReaderSync.js');
	load('../../src/javascript/core/utils/Url.js');
	load('../../src/javascript/runtime/RuntimeTarget.js');
	load('../../src/javascript/xhr/FormData.js');
	load('../../src/javascript/xhr/XMLHttpRequest.js');
	load('../../src/javascript/runtime/Transporter.js');
	load('../../src/javascript/image/Image.js');
	load('../../src/javascript/runtime/html5/Runtime.js');
	load('../../src/javascript/core/utils/Events.js');
	load('../../src/javascript/runtime/html5/file/FileInput.js');
	load('../../src/javascript/runtime/html5/file/FileDrop.js');
	load('../../src/javascript/runtime/html5/file/FileReader.js');
	load('../../src/javascript/runtime/html5/utils/BinaryReader.js');
	load('../../src/javascript/runtime/html5/image/JPEGHeaders.js');
	load('../../src/javascript/runtime/html5/image/ExifParser.js');
	load('../../src/javascript/runtime/html5/image/JPEG.js');
	load('../../src/javascript/runtime/html5/image/PNG.js');
	load('../../src/javascript/runtime/html5/image/ImageInfo.js');
	load('../../src/javascript/runtime/html5/image/ResizerCanvas.js');
	load('../../src/javascript/runtime/html5/image/Image.js');
	load('../../src/javascript/runtime/html5/xhr/XMLHttpRequest.js');
	load('../../src/javascript/core/utils/Loader.js');
	load('../../src/javascript/runtime/googledrive/Runtime.js');
	load('../../src/javascript/runtime/googledrive/file/FileInput.js');
	load('../../src/javascript/runtime/googledrive/file/FileReader.js');
	load('../../src/javascript/runtime/googledrive/xhr/XMLHttpRequest.js');
	load('../../src/javascript/runtime/dropbox/Runtime.js');
	load('../../src/javascript/runtime/dropbox/file/FileInput.js');
	load('../../src/javascript/runtime/dropbox/file/FileReader.js');
	load('../../src/javascript/runtime/dropbox/xhr/XMLHttpRequest.js');

	writeScripts();
})(this);

// $hash: b653f82754ab927240b8e09555aa160b