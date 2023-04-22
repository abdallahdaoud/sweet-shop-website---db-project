import ReactDOM from 'react-dom/client';
import './style.scss';
import axios from 'axios';
import image from './images/cake.PNG';
import { useState, createContext, useContext, useEffect } from "react";
import local from './local.js';

function Card(props) {
    const [setInfoMode, , setOrder] = useContext(UserContext);
    function handleSubmit(sName, sPrice, cook_time) {
      setOrder([sName, sPrice, cook_time]);
      setInfoMode(true);
    }
    return ( 
        <div className="card1">
          <img src={image} alt="cake"/>
          <div className="container1">
              <h3>{props.d.sName}</h3>
              <h5>price: {props.d.sPrice}</h5> 
              <h5>Cook time: {props.d.cook_time}</h5>
              <button className="btn1" onClick={() => {
                  handleSubmit(props.d.sName, props.d.sPrice, props.d.cook_time)}}>
              Buy</button> 
          </div>
        </div>
    )
}
function addCards(data) {
  return data.map((d) => <Card d={d}/>)
}
function CustomerInfo() {
  const [inputs, setInputs] = useState({});
  const [setInfoMode, order,] = useContext(UserContext);

  function handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  }
  function handleSubmit() {
     function fetchData() { 
      let cinfo = Object.keys(inputs).reduce((str, key) => (str + inputs[key] + ","), '');
      try {  axios.get("http://" + local + ":9000/" + 'customer: ' + cinfo + order); }
      catch { }
    };
    fetchData();
    setInfoMode(false);
  }
  return (
      <div id="popCard">
        <div className="card1">
          <div className="container1">
              <h3><b>Enter your information</b></h3> 
              <h5>name: </h5>
              <input type="text" name="cName" value={inputs.cName || ""} onChange={handleChange}/>
              <h5>phone: </h5>
              <input type="text" name="phone" value={inputs.phone || ""} onChange={handleChange}/>
              <h5>email address: </h5>
              <input type="text" name="email" value={inputs.email || ""} onChange={handleChange}/>
              <button className="btn1" onClick={() => {handleSubmit()}}><b>Buy</b></button>
          </div>
        </div>
      </div>
    )
}
function Sweets() {
  const [data, setData] = useState([]);
  useEffect(() => {
    let d = {'data':[]};
    async function fetchData() { 
        try { 
          let toSetData = [];
          d = await axios.get("http://" + local + ":9000/SELECT%20*%20FROM%20Sweets"); 
          d.data.map(arr => toSetData.push({'sName':arr['0'],'sPrice':arr['1'],'cook_time':arr['2']}));
          setData(toSetData);
          console.log(d.data);
        }
        catch { setData([]); }
    };
    fetchData();
  }, []); //Runs only on the first render
  return (
          <>
              <h1 className='myclass'>Sweets</h1> 
              {addCards(data)}
          </>
      )
}

const UserContext = createContext();
export default function App() { // just ==> function App() {  or ==> function AnyThing() { but shude start with capital
  const [infoMode, setInfoMode] = useState(false);
  const [order, setOrder] = useState([]);
  return (
    <UserContext.Provider value={[setInfoMode, order, setOrder]}>
      {(infoMode) && <CustomerInfo />}
      <div className="container"> 
        <Sweets />
      </div>
    </UserContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);