var i18n = require('./i18n');

function getLocaleString(id, region) {
  if(!region || !i18n[region]) {
    region = 'default';
  }

  return i18n[region][id];
}

module.exports = {
  getLocaleString
}