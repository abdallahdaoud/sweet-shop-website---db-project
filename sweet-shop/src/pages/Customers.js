import { useState, useContext } from "react";
import image from './images/cake.PNG';
import {UserContext} from '../index';

function Card(props) {
    const [mode, setMode] = useState(true); //true: for display, false: for input
    const [inputs, setInputs] = useState(props.d);
    const setdbResponse = useContext(UserContext);

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    function handleSubmit(type) {
        setdbResponse(values => ({...values, 'dbtable':'Customers', 'dbrequest':inputs, 
            'dbtype':type, 'tableKey':['phone', props.d.phone], 'run':!values['run']}));
        if(type === 'INSERT') setInputs({});
    }

    return ( mode ? 
        <div className="card1" onDoubleClick={() => setMode(!mode)}>
            <img src={image} alt="Customer"/>
            <div class="container1">
                <h3><b>{props.info}</b></h3> 
                <h5>name: {props.d.cName}</h5>
                <h5>Phone: {props.d.phone}</h5> 
                <h5>Email address: {props.d.email}</h5> 
            </div>
        </div>
        : 
        <div className="card1" onDoubleClick={() => setMode(!mode)}>
            <div className="container1">
                <h3><b>{props.info}</b></h3> 
                <h5>name: </h5>
                <input type="text" name="cName" value={inputs.cName || ""} onChange={handleChange}/>
                <h5>phone: </h5>
                <input type="text" name="phone" value={inputs.phone || ""} onChange={handleChange}/>
                <h5>email address: </h5>
                <input type="text" name="email" value={inputs.email || ""} onChange={handleChange}/>
                <button className="btn1" onClick={() => {handleSubmit(props.type)}}>{props.type}</button>
                {props.type !== 'INSERT' && 
                    <button className="btn2" onClick={() => {handleSubmit('DELETE')}}>DELETE</button>}
            </div>
        </div>
    )
}
function addCards(data) {
    return (
        <>
            {data.map((d) => <Card d={d} info={'Customer info'} type={'UPDATE'}/>)}
            <Card d={{}} info={'ADD NEW**'} type={'INSERT'}/>
        </>
        
    )
}
export default function Customers(props) {
    return (
            <>
                <h1 className='myclass'>Customers</h1> 
                {addCards(props.data)}
            </>
        )
}