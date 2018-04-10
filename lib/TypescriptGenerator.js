/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ken Chau @kenneth_chau
*/
"use strict";

class TypescriptGenerator {
	generate(module) {
		return module.originalSource();
	}
}

module.exports = TypescriptGenerator;
