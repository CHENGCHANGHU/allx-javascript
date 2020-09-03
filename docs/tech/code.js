let p = new Promise((resolve, reject) => {
  console.log('test');
  resolve();
}).then(data => console.log('ok'));
console.log('main'); 