import deindent from "deindent";
import execAppleScript from "../utils/execAppleScript";

async function setBaseSlide({ type, title, body }) {
  await execAppleScript(deindent`
    tell application "Keynote"
      activate
      try
        set thisDocument to front document
        tell thisDocument
            -- FORMAT THE FIRST SLIDE
            set the base slide of the first slide to master slide "${type}"
            tell the first slide
                set the object text of the default title item to "${title}"
                set the object text of the default body item to "${body}"
            end tell  
        end tell
      on error errorMessage number errorNumber
        display alert "SLIDE ISSUE" message errorMessage
      end try
    end tell
  `);
}

async function setSlide({ type, title, body }) {
  await execAppleScript(deindent`
    tell application "Keynote"
      activate
      try
        set thisDocument to front document
        tell thisDocument
          -- ADD INFORMATION SLIDE
          set thisSlide to make new slide with properties {base slide:master slide "${type}"}
          tell thisSlide
            set the object text of the default title item to "${title}"
            ${body
              ? `set the object text of the default body item to ${body}`
              : ""}
          end tell
        end tell
      on error errorMessage number errorNumber
        display alert "SLIDE ISSUE" message errorMessage
      end try
    end tell
  `);
}

class Slide {
  constructor(root, props) {
    this.root = root;
    this.props = props;
  }

  async render() {
    const { type, title, body } = this.props;
    if (this.index === 0) {
      await setBaseSlide(this.props);
    } else {
      await setSlide(this.props);
    }
  }
}

export default Slide;
