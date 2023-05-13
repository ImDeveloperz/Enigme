// import './App.css';
// import Test,{Test1} from './components/Test.jsx';
// function App() {
  //   return (
    //     <div className="App">
    
    //     </div>
    //   );
    // }
    
    // export default App;
    
    
    
    import React , { useState } from "react";
    import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
    import AddAccount from "./AddAccount";

export default function App() {

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    // console.log("closed");
  };
  return (
    <div className="app">
      <div className="Add-account">
        <AddAccount/>
      </div>

    </div>
  );
}
