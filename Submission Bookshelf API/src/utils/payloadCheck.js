/**
 * Mengecek payload apakah sudah sesuai kriteria.
 * @param {object} payload properties yang diminta.
 * @param {Array} properties array nama properties yang diwajibkan.
 * @return {object} payload jika sesuai, false ketika tidak sesuai.
 */
function payloadCheckProperties(payload, properties) {
  // eslint-disable-next-line prefer-const
  let notRequiredProperties = [];
  for (let i = 0; i < properties.length; i++) {
    const propertyName = properties[i];
    if (!payload.hasOwnProperty(propertyName)) {
      notRequiredProperties.push(propertyName);
    }
  }
  if (notRequiredProperties.length > 0 ) {
    return false;
  }
  return payload;
}

module.exports = payloadCheckProperties;

