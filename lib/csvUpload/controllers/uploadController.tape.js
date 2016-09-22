require('leaked-handles');

var app = require('_/app/test-app');
var test = require('tape');

test('GET /upload/tape should send JSON', function (assert) {
  app.get('/upload/tape')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(function (err, res) {
      assert.error(err, 'No Error');
      assert.ok(res, 'Response is truthy');
      assert.end();
    });
});


test('A passing test', (assert) => {

  assert.pass('This test will pass.');

  assert.end();
});

test('Assertions with tape.', (assert) => {
  const expected = 'something to test';
  const actual = 'sonething to test';

  assert.equal(actual, expected,
    'Given two mismatched values, .equal() should produce a nice bug report');

  assert.end();
});


test.onFinish(() => process.exit(0));
// test('POST /api/customers should send 201', function (assert) {
//   app.post('/api/customers')
//     .send({name: 'Barbara Doe'})
//     .expect(201)
//     .end(assert.end)
// })
