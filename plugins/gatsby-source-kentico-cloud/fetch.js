const fetch = require(`node-fetch`)

exports.getContentTypes = async (kcDeliveryEndpointUrl, kcProjectId) => {
  let response = await fetch(`${kcDeliveryEndpointUrl}/${kcProjectId}/types`)

  return response.json()
}