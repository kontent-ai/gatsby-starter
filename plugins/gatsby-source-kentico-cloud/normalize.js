const crypto = require(`crypto`)
const changeCase = require(`change-case`)

exports.createContentTypeNode = ({ createNodeId, contentType }) => {
  const codenameParamCase = changeCase.paramCase(contentType.system.codename)
  const nodeId = createNodeId(`kentico-cloud-type-${codenameParamCase}`)
  const nodeContent = JSON.stringify(contentType)

  const nodeContentDigest  = crypto
    .createHash(`md5`)
    .update(nodeContent)
    .digest(`hex`)

  const nodeData = {
    ...contentType,
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: `KenticoCloudType`,
      content: nodeContent,
      contentDigest: nodeContentDigest,
    }
  }

  return nodeData
}

exports.createContentItemNode = ({ createNodeId, contentItem, contentTypeNodes }) => {
  const codenameParamCase = changeCase.paramCase(contentItem.system.codename)
  const nodeId = createNodeId(`kentico-cloud-item-${codenameParamCase}`)
  const nodeContent = JSON.stringify(contentItem)

  const nodeContentDigest  = crypto
    .createHash(`md5`)
    .update(nodeContent)
    .digest(`hex`)

  const parentContentTypeNode = contentTypeNodes
    .filter(contentType => contentType.system.codename === contentItem.system.type)

  if (parentContentTypeNode && Array.isArray(parentContentTypeNode) && parentContentTypeNode.length > 0) {
    const codenamePascalCase = changeCase.pascalCase(parentContentTypeNode[0].system.codename)
    const nodeData = {
      ...contentItem,
      id: nodeId,
      parent: parentContentTypeNode[0].id,
      children: [],
      internal: {
        type: `KenticoCloudItem${codenamePascalCase}`,
        content: nodeContent,
        contentDigest: nodeContentDigest,
      }
    }

    return nodeData
  }
  else {
    return null
  }
}

exports.decorateTypeNodesWithChildren = ({ contentItemNodes, contentTypeNodes }) => {
  contentTypeNodes.forEach(contentTypeNode => {
    const itemNodesPerType = contentItemNodes
      .filter(contentItemNode => contentItemNode.system.type === contentTypeNode.system.codename)

    if (itemNodesPerType && Array.isArray(itemNodesPerType) && itemNodesPerType.length > 0) {
      let flatList = itemNodesPerType.map(itemNodePerType => itemNodePerType.id)
      contentTypeNode.children.push(...flatList)
    }
  })
}