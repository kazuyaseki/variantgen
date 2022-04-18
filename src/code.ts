figma.showUI(__html__, { width: 800, height: 480 });

console.log(figma.currentPage.selection);

const selectedNodes = figma.currentPage.selection;

if (selectedNodes.length === 0) {
  figma.notify('please select a default node');
  // Commenting out now for development
  // figma.closePlugin()
}

if (selectedNodes.length > 1) {
  figma.notify('please select just one node');
  // Commenting out now for development
  // figma.closePlugin()
}

const node = selectedNodes[0];

if (node.type === 'COMPONENT' && node.parent?.type === 'COMPONENT_SET') {
  console.log(node.parent.variantGroupProperties);
  figma.ui.postMessage({
    variantGroups: node.parent.variantGroupProperties,
  });
}

export {};
