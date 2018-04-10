/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ken Chau @kenneth_chau
*/
"use strict";

const { Tapable } = require("tapable");
const typescript = require("typescript");

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
		if (typeof typescript !== "undefined") {
			// TODO
			const program = typescript.createProgram([], {});

			const transpiledModule = typescript.transpileModule(source, {
				compilerOptions: { rootDir: undefined },
				transformers: [],
				reportDiagnostics: true,
				filename: state.module.filename
			});

			const { outputText, sourceMapText, diagnostics } = transpiledModule;

			console.log(state.module.request);

/*
			state.module.buildMeta.providedExports = WebAssembly.Module.exports(
				module
			).map(exp => exp.name);

			for (const imp of WebAssembly.Module.imports(module)) {
				const dep = new WebAssemblyImportDependency(imp.module, imp.name);
				state.module.addDependency(dep);
			}
*/
			console.log(outputText);
		} else {
			throw new Error(
				"Can't compile WebAssembly modules without WebAssembly support in current node.js version (Update to latest node.js version)"
			);
		}
	}
}

module.exports = TypescriptParser;
