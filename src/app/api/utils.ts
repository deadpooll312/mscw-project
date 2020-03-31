export function getOrigin() {
  return location.hostname ? location.origin : location.ancestorOrigins && location.ancestorOrigins.item(0);
}

export function urlFromSrc(src, baseURL) {
  const UrlCreator = window.URL || (window as any).webkitURL;
  const baseUrl = baseURL && baseURL.indexOf('http') !== -1 ? baseURL : [getOrigin(), baseURL].join('');
  const url: URL = new UrlCreator(src, baseUrl);
  return url;
}