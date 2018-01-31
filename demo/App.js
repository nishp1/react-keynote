import React, { Component } from "react";
import { Document, Slide, render } from "../src";

class App extends Component {
  render() {
    return (
      <Document theme="Black" width={1024} height={768}>
        <Slide
          type="Title & Subtitle"
          title="React Keynote"
          body="Yet another custom renderer..."
        />
        <Slide
          type="Title & Subtitle"
          title="Random Title"
          body={
            '"Bullet Point 1" & return & "Bullet Point 2" & return & "Bullet Point 3"'
          }
        />
        <Slide type="Title - Center" title="♥ React" />
      </Document>
    );
  }
}

render(<App />);
