(function (root, factory) {
  /* istanbul ignore next*/
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.anyQs = factory();
  }
}(this, function () {
  /**
   * return an object contains all query parameters or empty object
   * @param {string} url
   * @return {object}
   */
  function anyQs(url) {
    var params = {},
      tempArr = decodeURI(url)
                    .replace(/\+/g, ' ')
                    .match(/\w+=[^&#?\/]+/g);
    if (!tempArr) {
      return {};
    }
    tempArr.forEach(function (item) {
      var ps = item.split('=');
      params[ps[0]] = /^\d+(\.\d+)?$/.test(ps[1]) ? parseFloat(ps[1]) : ps[1];
    });

    return params;
  }

  return anyQs;
}));