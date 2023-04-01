export function isDomNode(node: unknown): node is Element {
    return node instanceof Element;
}
