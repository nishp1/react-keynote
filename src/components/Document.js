import shell from "shelljs";
import deindent from "deindent";
import execAppleScript from "../utils/execAppleScript";

class Document {
  // Stores all the children
  children = [];

  constructor(root, props) {
    this.root = root;
    this.props = props;
  }

  appendChild(child) {
    child.parent = this;
    child.index = this.children.length;
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    child.parent = null;
    this.children.slice(index, 1);

    this.children.forEach((child, index) => {
      child.index = index;
    });
  }

  async createDocument() {
    const { theme, width = 1024, height = 768 } = this.props;

    await execAppleScript(deindent`
      property thisThemeName : "${theme}"
      tell application "Keynote"
        activate
        try
          -- get theme names
          set the themeNames to the name of every theme
          
          -- create a default document, styled with the chosen theme
              set thisDocument to make new document with properties {document theme:theme thisThemeName, width:${width}, height:${height}}

        on error errorMessage number errorNumber
          if errorNumber is not -128 then
            display alert "THEME ISSUE" message errorMessage
          end if
        end try
      end tell
    `);
  }

  async renderChildren() {
    for (let i = 0; i < this.children.length; i++) {
      await this.children[i].render();
    }
  }

  async startPresentation() {
    await execAppleScript(deindent`
      tell application "Keynote"
        activate
        try
          set thisDocument to front document
          start thisDocument from first slide of thisDocument
        on error errorMessage number errorNumber
          display alert "SLIDE ISSUE" message errorMessage
        end try
      end tell
    `);
  }

  async render() {
    await this.createDocument();
    await this.renderChildren();
    // await this.startPresentation();
  }
}

export default Document;
