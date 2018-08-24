const crypto = require(`crypto`)
const changeCase = require(`change-case`)

exports.createContentTypeNode = (createNodeId, contentType) => {
  const codenameParamCase = changeCase.paramCase(contentType.system.codename)
  const nodeId = createNodeId(`kentico-cloud-type-${codenameParamCase}`)

  const nodeData = {
    contentItems___NODE: []
  }

  return createKcArtifactNode(nodeId, contentType, `type`, contentType.system.codename, nodeData)
}

exports.createContentItemNode = (createNodeId, contentItem, contentTypeNodes) => {
  const codenameParamCase = changeCase.paramCase(contentItem.system.codename)
  const languageParamCase = changeCase.paramCase(contentItem.system.language)
  const nodeId = createNodeId(`kentico-cloud-item-${codenameParamCase}-${languageParamCase}`)

  const parentContentTypeNode = contentTypeNodes
    .find(contentType => contentType.system.codename === contentItem.system.type)

  const nodeData = {
    otherLanguages___NODE: [],
    contentType___NODE: parentContentTypeNode.id
  }

  return createKcArtifactNode(nodeId, contentItem, `item`, contentItem.system.type, nodeData)
}

exports.decorateTypeNodesWithItemLinks = (contentItemNodes, contentTypeNodes) => {
  contentTypeNodes.forEach(contentTypeNode => {
    const itemNodesPerType = contentItemNodes
      .filter(contentItemNode => contentItemNode.system.type === contentTypeNode.system.codename)

    if (itemNodesPerType && Array.isArray(itemNodesPerType) && itemNodesPerType.length > 0) {
      let flatList = itemNodesPerType.map(itemNodePerType => itemNodePerType.id)
      contentTypeNode.contentItems___NODE.push(...flatList)
    }
  })
}

exports.decorateItemNodeWithLanguageVariantLink = (itemNode, allNodesOfAnotherLanguage) => {
  const languageVariantNode = allNodesOfAnotherLanguage.find(nodeOfSpecificLanguage => itemNode.system.codename === nodeOfSpecificLanguage.system.codename)
  itemNode.otherLanguages___NODE.push(languageVariantNode.id)
}

createKcArtifactNode = (nodeId, kcArtifact, artifactKind, typeName = ``, additionalNodeData = null) => {
  const nodeContent = JSON.stringify(kcArtifact)

  const nodeContentDigest = crypto
    .createHash(`md5`)
    .update(nodeContent)
    .digest(`hex`)

  const codenamePascalCase = changeCase.pascalCase(typeName)
  const artifactKindPascalCase = changeCase.pascalCase(artifactKind)

  return {
    ...kcArtifact,
    ...additionalNodeData,
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: `KenticoCloud${artifactKindPascalCase}${codenamePascalCase}`,
      content: nodeContent,
      contentDigest: nodeContentDigest,
    }
  }
}