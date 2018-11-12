const expect = require('chai').expect;
const ftypeorm = require('../dist/index.js');

describe('testing plugin', () => {
  it('should be a function', () => {
    expect(ftypeorm).to.exist;
  });

  it('should have a `many` method', () => {
    expect(ftypeorm.many).to.exist;
  });
});
