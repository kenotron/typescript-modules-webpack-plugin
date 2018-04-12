/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ken Chau @kenneth_chau
*/
"use strict";

const { RawSource } = require("webpack-sources");

function transform(ctx) {
	
	const visitor = (node) => {
		return ts.visitEachChild(node, visitor, ctx);
	}

	return (sourceFile) => ts.visitNode(sourceFile, visitor);
}

class TypescriptGenerator {
	generate(module) {
		let source = '';
		const sourceFile = module.buildMeta.program.getSourceFiles()[0];

		const writeCallback = (
			fileName,
			data,
			writeByteOrderMark
		) => {
			source = data;
		};

		// example transform: https://github.com/longlho/ts-transform-system-import/blob/master/src/transform.ts
		const result = module.buildMeta.program.emit(sourceFile, writeCallback, undefined, undefined, {
			before: [
				transform()
			]
		});

		return new RawSource(source);
	}
}

module.exports = TypescriptGenerator;
