var assume = require('assume');
var jsone = require('../src/');

suite('misc', function() {
  test('custom builtin', function() {
    let my_builtin = (x, y) => Math.sqrt(x * x + y * y);

    assume(jsone({_eval: 'my_builtin(3, 4)'}, {my_builtin})).eql(5);
  });

  test('time doesn\'t change mid-evaluation (operator)', function() {
    let template = [...Array(1000).keys()].map(() => ({_fromNow: ''}));
    let result = new Set(jsone(template, {}));

    assume(result.size).eql(1);
  });

  test('time doesn\'t change mid-evaluation (builtin)', function() {
    let template = [...Array(1000).keys()].map(() => ({_eval: 'fromNow("")'}));
    let result = new Set(jsone(template, {}));

    assume(result.size).eql(1);
  });

  test('now builtin returns a string', function() {
    assume(typeof jsone({_eval: 'now'}, {})).eql(typeof 'string');
  });
});