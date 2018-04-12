import bar from './bar';

export default function foo(a: number, b: number) {
	return bar(a + b);
}

(async () => {
	console.log(await Promise.resolve(5));
})()