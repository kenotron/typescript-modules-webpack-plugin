/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ken Chau @kenneth_chau
*/
"use strict";

const { RawSource } = require("webpack-sources");

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

		const result = module.buildMeta.program.emit(sourceFile, writeCallback);

		return new RawSource(source);
	}
}

module.exports = TypescriptGenerator;
