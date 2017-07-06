[![Build Status](https://travis-ci.org/yeluoqiuzhi/any-qs.svg?branch=master)](https://travis-ci.org/yeluoqiuzhi/any-qs)
[![Coverage Status](https://coveralls.io/repos/github/yeluoqiuzhi/any-qs/badge.svg?branch=master)](https://coveralls.io/github/yeluoqiuzhi/any-qs?branch=master)

# any-qs

parse any query parameters from url

## install

```shell
npm i -S any-qs
```

## usage

### decodeURI

```js
const url = 'https://www.baidu.com/?cid=id_34&product=%E5%A4%9A%E5%A4%9A%E6%96%87%E5%AD%97#?value=32&key=key110&system=多多测试';
const params = anyQs(url);
console.log(params);
/*
{
  cid: 'id_34',
  product: '多多文字',
  value: 32,
  key: 'key110',
  system: '多多测试'
}
*/
```

### replace + with one space

```js
const url = 'https://www.google.co.jp/?gfe_rd=cr&ei=2DVeWYrjGo3XqAH_24qQCA#newwindow=1&q=just+a+test+suit';
const params = anyQs(url);
console.log(params);
/*
{
  gfe_rd: 'cr',
  ei: '2DVeWYrjGo3XqAH_24qQCA',
  newwindow: 1,
  q: 'just a test suit'
})
*/
```

```

### parse number value

```js
const url = 'http://www.baidu.com?name=yeluoqiuzhi&born=1994&age=@24&height=174.5';
const params = anyQs(url);
console.log(typeof params.born); // number
console.log(typeof params.height) // number
console.log(params.height) // 174.5
```

### return empty object when match nothing

```js
const url = 'https://www.google.com';
const params = anyQs(url);
console.log(params);
/*
{}
*/