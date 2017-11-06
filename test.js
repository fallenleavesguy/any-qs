const anyQs = require('./index');
const { stringOnly } = anyQs;
const expect = require('chai').expect;

describe('any-qs', () => {
  describe('parse url', () => {
    it('should parse all param in url', () => {
      const url = 'https://www.baidu.com/?cid=id_34&product=%E5%A4%9A%E5%A4%9A%E6%96%87%E5%AD%97#?value=32&key=key110&system=多多测试';
      const params = anyQs(url);
      
      expect(params).to.deep.equal({
        cid: 'id_34',
        product: '多多文字',
        value: 32,
        key: 'key110',
        system: '多多测试'
      });
    });

    it('should replace + with one space', () => {
      const url = 'https://www.google.co.jp/?gfe_rd=cr&ei=2DVeWYrjGo3XqAH_24qQCA#newwindow=1&q=just+a+test+suit';
      const params = anyQs(url);

      expect(params).to.deep.equal({
        gfe_rd: 'cr',
        ei: '2DVeWYrjGo3XqAH_24qQCA',
        newwindow: 1,
        q: 'just a test suit'
      });
    });

    it('should return empty object when match nothing', () => {
      const url = 'http://www.baidu.com';
      const params = anyQs(url);

      expect(params).to.be.empty;
    });

    it('should convert string to number', () => {
      const url = 'http://www.baidu.com?name=yeluoqiuzhi&born=1994&age=@24&height=174.5';
      const params = anyQs(url);
      expect(typeof params.born).to.equal('number');
    });
  });
  
  describe('parse anything look like key=value', () => {
    let rawStr = 'nick=yeluoqiuzhi,email=test@email.com; url=http://github.com';
    /**
     * @type {string} string encoded with encodedURI
     */
    let encodedStr = 'nick=yeluoqiuzhi,email=test@email.com;%20url=http://github.com';
    let result = {
      nick: 'yeluoqiuzhi',
      email: 'test@email.com',
      url: 'http:'
    };

    it('should parse raw string', () => {
      const params = anyQs(rawStr);
      expect(params).to.deep.equal(result);
    });

    it('should parse encoded string', () => {
      const params = anyQs(encodedStr);
      expect(params).to.deep.equal(result);
    });
  });

  describe('alternative version(stringOnly) that only parse string', () => {
    it('should convert number to string', () => {
      const url = 'http://www.baidu.com?name=yeluoqiuzhi&born=1994&age=@24&height=174.5';
      const params = stringOnly(url);
      expect(typeof params.born).to.equal('string');
    });
  });
  describe('do not parse \/', () => {
    it('should not parse \/', () => {
      const url = 'http://www.baidu.com?name=yeluoqiuzhi&born=1994&age=@24&height=174.5/';
      const params = stringOnly(url);
      expect(params).to.deep.equal({
        name: 'yeluoqiuzhi', born: '1994', age: '@24', height: '174.5'
      });
    });
  });
});