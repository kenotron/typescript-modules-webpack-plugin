/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ken Chau @kenneth_chau
*/
"use strict";

const TypescriptGenerator = require("./TypescriptGenerator");
const TypescriptParser = require("./TypescriptParser");

class TypescriptModulesWebpackPlugin {
    apply(compiler) {
		compiler.hooks.compilation.tap(
			"TypescriptModulesPlugin",
			(compilation, { normalModuleFactory }) => {
				normalModuleFactory.hooks.createParser
					.for("typescript/experimental")
					.tap("TypescriptModulesPlugin", () => {
						return new TypescriptParser();
					});

				normalModuleFactory.hooks.createGenerator
					.for("typescript/experimental")
					.tap("TypescriptModulesPlugin", () => {
						return new TypescriptGenerator();
					});

				compilation.chunkTemplate.hooks.renderManifest.tap(
					"TypescriptModulesPlugin",
					(result, options) => {
						/*const chunk = options.chunk;
						const outputOptions = options.outputOptions;
						const moduleTemplates = options.moduleTemplates;
						const dependencyTemplates = options.dependencyTemplates;

						for (const module of chunk.modulesIterable) {
							if (module.type && module.type.startsWith("webassembly")) {
								const filenameTemplate =
									outputOptions.webassemblyModuleFilename;

								result.push({
									render: () =>
										this.renderWebAssembly(
											module,
											moduleTemplates.webassembly,
											dependencyTemplates
										),
									filenameTemplate,
									pathOptions: {
										module
									},
									identifier: `webassemblyModule${module.id}`,
									hash: module.hash
								});
							}
						}*/

						return result;
					}
				);
			}
		);
	}

	renderTypescript(module, moduleTemplate, dependencyTemplates) {
		return moduleTemplate.render(module, dependencyTemplates, {});
	}
}

modules.exports = TypescriptModulesWebpackPlugin;