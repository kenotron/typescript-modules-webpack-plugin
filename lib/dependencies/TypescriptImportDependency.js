/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const DependencyReference = require("webpack/lib/dependencies/DependencyReference");
const ModuleDependency = require("webpack/lib/dependencies/ModuleDependency");

class TypescriptImportDependency extends ModuleDependency {
	constructor(request) {
		super(request);
	}

	get type() {
		return "typescript import";
	}
}

module.exports = TypescriptImportDependency;
