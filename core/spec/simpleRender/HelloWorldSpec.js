var helper = require("../tritonHelper");

describe("A basic page", () => {

	helper.startTritonBeforeAll([
		"./simpleRender/HelloWorldPage", 
		"./simpleRender/GoodbyeWorldPage", 
		"./simpleRender/MultiElementPage"
	]);

	helper.stopTritonAfterAll();

	describe("can say 'Hello, world!'", () => {
		helper.testWithDocument("/helloWorld", (document) =>{
			expect(document.querySelector("div#foo").innerHTML).toMatch("Hello, world!");
		});
	});

	describe("can say 'Goodbye, world!'", () => {
		helper.testWithDocument("/goodbyeWorld", (document) => {
			expect(document.querySelector("div#foo").innerHTML).toMatch(/Goodbye/);
		});
	});

	describe("has React on client-side", () => {
		helper.testWithWindow("/goodbyeWorld", (window) => {
			expect(window.React).toBeDefined();
		});
	});

	describe("can have multiple elements", (done) => {
		helper.testWithDocument("/multiElement", (document, done) => {
			expect(document.querySelector("div#foo1").innerHTML).toMatch("Div1");
			expect(document.querySelector("div#foo2").innerHTML).toMatch("Div2");
			done();
		});
	});
});