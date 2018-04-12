/// <reference types="typescript" />

const ts = require("typescript");

const options = {
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5, 
    module: ts.ModuleKind.CommonJS,
    outDir: 'yo',
    isolatedModules: true,
    allowNonTsExtensions: true,
    noResolve: true,
    noLib: true
};

let fileNames = ['foo.ts'];

let program = ts.createProgram(fileNames, options);

let sourceFile = program.getSourceFiles()[0];

console.log(sourceFile);

debugger;

let emitResult = program.emit();

// ---
// let t = process.hrtime();
// for (var i = 0; i < 9000; i++) {
//     program = ts.createProgram(['bar.ts'], options);
//     program.emit();
// }

// let duration = process.hrtime(t);
// console.log(`${duration[0] + duration[1] / 1e9}s`)