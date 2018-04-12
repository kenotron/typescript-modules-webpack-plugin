/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ken Chau @kenneth_chau
*/
"use strict";

const { Tapable } = require("tapable");
const ts = require("typescript");
const TypescriptImportDependency = require('./dependencies/TypescriptImportDependency');

const tsOptions = {
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5, 
    module: ts.ModuleKind.CommonJS,
    outDir: 'yo',
    isolatedModules: true,
    allowNonTsExtensions: true,
    noResolve: true,
	noLib: true,
	sourceMap: true
};

class TypescriptParser extends Tapable {
	constructor(options) {
		super();
		this.hooks = {};
		this.options = options;
	}

	parse(source, state, callback) {
		// flag it as ESM
		state.module.buildMeta.exportsType = "namespace";

		// extract exports
		if (typeof ts !== "undefined") {
			// TODO
			const program = ts.createProgram([state.module.request], tsOptions);

			const imports = program.getSourceFiles()[0].imports;

			imports.forEach(imp => {
				const dep = new TypescriptImportDependency(imp.text);
				state.module.addDependency(dep);
			});

			state.module.buildMeta.program = program;

			callback(null, state);
/*
			state.module.buildMeta.providedExports = WebAssembly.Module.exports(
				module
			).map(exp => exp.name);
*/
		} else {
			throw new Error(
				"Typescript parser error"
			);
		}
	}
}

module.exports = TypescriptParser;
