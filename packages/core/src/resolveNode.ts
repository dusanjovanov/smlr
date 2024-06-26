import { TextElement } from "./text";
import { SmlrElement, SmlrNode } from "./types";
import { isFunction, isMintElement, isTextNode } from "./utils";

export const resolveNode = (
  node: SmlrNode,
  parent: SmlrElement,
  startIndex = 0
) => {
  const flatNodes = Array.isArray(node) ? node.flat(Infinity as 1) : [node];

  const elements: SmlrElement[] = [];

  const len = flatNodes.length;

  for (let i = 0; i < len; i++) {
    const n = flatNodes[i];

    let el: SmlrElement;

    if (isTextNode(n) || isFunction(n)) {
      el = new TextElement(n as any);
    }
    //
    else if (isMintElement(n)) {
      el = n;
    }

    if (el!) {
      el.parent = parent;
      el.index = startIndex + i;
      elements.push(el);
    }
  }

  return elements;
};
