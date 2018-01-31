import fs from "fs";
import path from "path";
import createElement from "../utils/createElement";
import KeynoteRenderer from "../reconciler/";

// Renders the input component
async function render(element, filePath) {
  // Create root container instance
  const container = createElement("ROOT");
  // Returns the current fiber (flushed fiber)
  const node = KeynoteRenderer.createContainer(container);

  // Schedules a top level update with current fiber and a priority level (depending upon the context)
  KeynoteRenderer.updateContainer(element, node, null);

  await container.document.render();
}

export default render;
