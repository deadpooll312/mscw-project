
global.defaultLogin = document.querySelector('meta[name="defaultLogin"]')?.getAttribute('content');
global.defaultLoginPass = document.querySelector('meta[name="defaultLoginPass"]')?.getAttribute('content');

require('./index');
