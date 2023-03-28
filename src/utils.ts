export function isDomNode(node: unknown): node is Element {
    return !!(node && (node as Element).nodeType === 1);
}
