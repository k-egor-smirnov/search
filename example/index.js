const Search = require("../lib");

const search = new Search();

search.add("Привет", { foo: "bar" });

console.log(search.find("pri"));
console.log(search.find("при"));
