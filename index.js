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
  var defaultOptions = {
    parseNumber: true
  };
  /**
   * return an object contains all query parameters or empty object
   * @param {string} url
   * @return {object}
   */
  function anyQs(url, options) {
    var postOptions = defaultOptions;
    if (typeof options === 'undefined') {
      options = defaultOptions;
    } else {
      for (var i in options) {
        postOptions[i] = options[i];
      }
    }

    var params = {},
      tempArr = decodeURI(url)
                    .replace(/\+/g, ' ')
                    .match(/\w+=[^&#?\/,;]+/g);
    if (!tempArr) {
      return {};
    }
    tempArr.forEach(function (item) {
      var ps = item.split('=');
      if (postOptions.parseNumber) {
        params[ps[0]] = /^\d+(\.\d+)?$/.test(ps[1]) ? parseFloat(ps[1]) : ps[1];
      } else {
        params[ps[0]] = ps[1];
      }
    });

    return params;
  }

  /**
   * Alternative version that don't parse number
   */
  anyQs.stringOnly = function(url) {
    return anyQs(url, { parseNumber: false });
  }
  return anyQs;
}));