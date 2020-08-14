function Foo(name) {
  this.name = name;
  return this;
}

Foo.prototype.getName = function () {
  return this.name;
}

const fooFactory = function (...args) {
  let obj = new Object(), Constructor = args.shift();
  obj.__proto__ = Constructor.prototype;
  let res = Constructor.apply(obj, args);
  console.log(res);
  return res;
}

let foo = fooFactory(Foo, 'foo');
console.log(foo); // Foo { name: 'foo' }
console.log(foo.getName()); // foo

let foo2 = new Foo('foo');
console.log(foo2); // Foo { name: 'foo' }
console.log(foo2.getName()); // foo