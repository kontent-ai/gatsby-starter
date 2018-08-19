const deliveryClient = require(`kentico-cloud-delivery`);
const normalize = require(`./normalize`)
const fetch = require(`./fetch`)

exports.sourceNodes = async ({ boundActionCreators, createNodeId }, { kcDeliveryEndpointUrl, kcProjectId }) => {
  const { createNode } = boundActionCreators;
  console.log(`sourceNodes executes`);

  const client = new deliveryClient.DeliveryClient({
    projectId: kcProjectId
  });

  let contentTypes = await fetch.getContentTypes(kcDeliveryEndpointUrl, kcProjectId)

  let contentTypeNodes = contentTypes.types.map(contentType => 
    normalize.createContentTypeNode({ createNodeId, contentType }))

  let contentItemNodes = [];
  let response = await client.items().getPromise()

  response.items.forEach(contentItem => {
    let contentItemNode = normalize.createContentItemNode({ createNodeId, contentItem, contentTypeNodes })
    contentItemNodes.push(contentItemNode)
  })

  normalize.decorateTypeNodesWithChildren({ contentItemNodes, contentTypeNodes })
  contentTypeNodes.forEach(contentTypeNode => createNode(contentTypeNode))
  contentItemNodes.forEach(contentItemNode => createNode(contentItemNode))

  return
};