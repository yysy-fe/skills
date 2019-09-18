const myJsonp = (url, param, callback, callbackName = 'callback') => {
  let requestUrl = url;
  let paramStrArr = [];
  for (let key in param) {
    let value = param[key];
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    paramStrArr.push(`${key}=${value}`)
  }

  let paramStr = paramStrArr.join('&');
  let op = '';
  if (requestUrl.indexOf('?') > -1) {
    op = '&';
  } else {
    op = '?';
  }
  let uniqueLocalCallbackName = `${callbackName}${Date.now()}`;
  requestUrl += op + paramStr + `&${callbackName}=${uniqueLocalCallbackName}`;

  let scriptEle = document.createElement('script');
  scriptEle.src = requestUrl;

  window[uniqueLocalCallbackName] = function (result) {
    callback(result);
    window[uniqueLocalCallbackName] = null;
    document.body.removeChild(scriptEle);
  }
  document.body.appendChild(scriptEle);
}
