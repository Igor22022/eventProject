let user = {};
let proxy = new Proxy(user, {
  get(target, prop) {
    //Can do something
    
    console.log(`Reading ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Writing ${prop} ${value}`);
    target[prop] = value;
    return true;
  }
});

proxy.name = 'Max'; // Writing name Max
proxy.name; // Reading name