import React,{useEffect} from 'react';

import './App.css';
import apis from './apis/apis';

function App() {
  
  const checkServerConnection = async()=>{
    try {
      const {data} = await apis.checkConnection();
      if(data.status=== "success"){
        console.log(data.message);
      }
    } catch (error) {
      alert("Server not connected!");
    }
  }

  useEffect(()=>{
    checkServerConnection();
  },[]);

  return (
    <div className="App">
      ChaiPeCharcha
    </div>
  );
}

export default App;
