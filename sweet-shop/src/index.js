import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import axios from 'axios';
import './style.scss';
import Layout from './pages/Layout';
import Sweets from './pages/Sweets';
import Customers from './pages/Customers';
import Ingredients from './pages/Ingredients';
import NoPage from './pages/NoPage';
import local from './local.js';

export const UserContext = createContext();

export default function App() { // just ==> function App() {  or ==> function AnyThing() { but shude start with capital
  const [{dbtable, dbrequest, dbtype, sDBresponse, cDBresponse, iDBresponse, tableKey, run}, setdbResponse] 
    = useState({'table':'Sweets', 'request':'all', 'type':'SELECT'
    ,'sDBresponse':[], 'cDBresponse':[], 'iDBresponse':[], 'tableKey':['',''], 'run':false});
  //////////////////////////
    let table = dbtable, request = dbrequest, type = dbtype;
  const send = [];
  useEffect(() => {
    async function fetchData() {
      console.log(Object.keys(request).reduce((str, key) => str + ',' + key));
      let req = "http://" + local + ":9000/" + type + "%20";
      let [tname, tvalue] = tableKey;
      console.log("t: " + tname + ", " +tvalue);
      console.log('1)res type: '+ typeof(request) + ', res: ' + request + ', type: ' + type);

      if(type === 'SELECT') request = req + "*%20FROM%20" + table 
        + ((request.toLowerCase() === 'all') ? '' : "%20WHERE%20" + request);
        
      else if(type === 'UPDATE') request = req + table + "%20SET%20" 
        + Object.keys(request).reduce((str, key) => (str + key + "='" + request[key] + "',"), '').slice(0,-1) 
        + "%20WHERE%20" + tname + "='" + tvalue + "'";

      else if(type === 'INSERT') request = req + "INTO%20" + table + "%20("
        + Object.keys(request).reduce((str, key) => (str + ',' + key)) + ")%20values%20(" 
        + Object.keys(request).reduce((str, key) => (str + "'" + request[key] + "',"), '').slice(0,-1) + ")";

      else if(type === 'DELETE') request = req + "FROM%20" + table + "%20WHERE%20" + tname + "='" 
      + tvalue + "'";        
      
      console.log('2)res type: '+typeof(request) + ', res: ' + request + ', type: ' + type);
      ////////////////////////////////////
      
      let data = '';
      try {
        data = await axios.get(request);
        console.log(data);
        console.log('done: ' + data.data + ", cond: " );
        console.log(data.data === "execute command succeeded");
        if(data.data === "execute command succeeded") {
          setdbResponse(values => ({...values, 'dbtable':table, 'dbrequest':'all', 'dbtype':'SELECT', 'run':!values['run']}));
        }
      } 
      catch {
        console.log('not done: ' + data);
        data = {data:[]};
        console.log('err');
      }
      console.log('data: ' + data);

      let d = data.data;
      console.log('d: ' + d);

      switch(table) {
        case 'Sweets': d.map(arr => send.push({'sName':arr['0'],'sPrice':arr['1'],'cook_time':arr['2']}));
          setdbResponse(values => ({...values, ['sDBresponse']: send}));
          break;
        case 'Customers': 
          d.map(arr => send.push({'phone':arr['0'],'cName':arr['1'],'email':arr['2']}));
          setdbResponse(values => ({...values, ['cDBresponse']: send}));
          break;
        case 'Ingredients': 
          d.map(arr => send.push({'iName':arr['0'],'iPrice':arr['1'],'company':arr['2'],'bring_time':arr['3']}));
          setdbResponse(values => ({...values, ['iDBresponse']: send})); 
      }
      console.log(cDBresponse);
    }
    fetchData();
  }, [run]);
 
  return (
    <UserContext.Provider value={setdbResponse}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<Sweets data={sDBresponse}/>} />
              <Route path='Customers' element={<Customers data={cDBresponse}/>} />
              <Route path='Ingredients' element={<Ingredients data={iDBresponse}/>} />
              <Route path='*' element={<NoPage />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);