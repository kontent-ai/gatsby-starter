const fetch = require(`../fetch`)
const config = require(`../../../gatsby-config`)

it(`fetches KC types`, async () => {
  const options = config.plugins[1].options
  const contentTypes = await fetch.getContentTypes(options.kcDeliveryEndpointUrl, options.kcProjectId)
  expect(contentTypes).toMatchSnapshot()
})