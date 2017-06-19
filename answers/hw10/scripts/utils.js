const i18n = require('./i18n');

function getLocaleString(id, region) {
  let getRegion;
  if (!region || !i18n[region]) {
    getRegion = 'default';
  }
  else {
    getRegion = region;
  }

  return i18n[getRegion][id];
}

module.exports = {
  getLocaleString,
};
