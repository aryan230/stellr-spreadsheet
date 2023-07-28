import logo from "./logo.svg";
import "./App.css";
import TextEditor from "./TextEditor";
import ReactTextEditor from "./ReactTextEditor";
import Spreadsheet from "./Spreadsheet";
import exampleData from "./exampleData";
import { useState } from "react";
function App() {
  const [read, setRead] = useState(false);
  return (
    <div className="App" style={{ height: "100vh" }}>
       
     <Spreadsheet
        height="80%"
        data={exampleData}
        options={
          read && {
            mode: "read",
            showToolbar: false,
            showGrid: false,
            showContextmenu: false,
          }
        }
      />
    </div>
  );
}

export default App;
