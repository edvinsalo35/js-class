// TODO your job is to write a helpful method to create
// a gramatical english list
//
//
// It'll be used like this:
//
//   englishList(["one","two","three"]) // "one, two and three"
//
// @type englishList = (items: Array<string>) => string

export function englishList(args) {
  switch(args.length) {
    case 0: return "";
    case 1: return args[0];
    case 2: return args.join(" and ");
    default: return args.slice(0, args.length - 1).join(", ") + " and " + args[args.length - 1];
  }
};

// TODO implement the 'dig' function, that looks up
// deeply nested properties. it should be 'safe' - if
// we hit undefined/null we should stop
//
//
//    dig({ a: { b: "hi } }, "a", "b") // 'hi'
//    dig({ a: { b: "hi } }, "a") // { b: "hi" }
//    dig({ a: { b: "hi } }, "z", "z") // undefined
//
// @type dig = (object: Object, ...properties: Array<string>) => any

export function dig(object, ...properties) {
  return properties.reduce(function(value, prop) {
    return value == null ? value : value[prop];
  }, object);
}
