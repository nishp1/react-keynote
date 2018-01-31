import { Slide, Document, Keynote } from "../components/";

// Creates an element with an element type, props and a root instance
function createElement(type, props, root) {
  const COMPONENTS = {
    ROOT: () => new Keynote(),
    SLIDE: () => new Slide(root, props),
    DOCUMENT: () => new Document(root, props),
    default: undefined
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export default createElement;
