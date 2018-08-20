const deliveryClient = require(`kentico-cloud-delivery`)
const normalize = require(`./normalize`)

exports.sourceNodes = async ({ boundActionCreators, createNodeId }, { kcProjectId }) => {
  const { createNode } = boundActionCreators;
  console.log(`sourceNodes executes`);

  const client = new deliveryClient.DeliveryClient({
    projectId: kcProjectId
  });

  const contentTypesResponse = await client.types().getPromise()

  let contentTypeNodes = contentTypesResponse.types.map(contentType => 
    normalize.createContentTypeNode({ createNodeId, contentType })
  )

  const contentItemsResponse = await client.items().getPromise()

  let contentItemNodes = contentItemsResponse.items.map(contentItem =>
    normalize.createContentItemNode({ createNodeId, contentItem, contentTypeNodes })
  )

  normalize.decorateTypeNodesWithChildren({ contentItemNodes, contentTypeNodes })
  contentTypeNodes.forEach(contentTypeNode => createNode(contentTypeNode))
  contentItemNodes.forEach(contentItemNode => createNode(contentItemNode))

  return
}