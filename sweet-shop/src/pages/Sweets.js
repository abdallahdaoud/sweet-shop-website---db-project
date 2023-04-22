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
        setdbResponse(values => ({...values, 'dbtable':'Sweets', 'dbrequest':inputs, 
            'dbtype':type, 'tableKey':['sName', props.d.sName], 'run':!values['run']}));
        if(type === 'INSERT') setInputs({});
    }

    return ( mode ? 
        <div className="card1" onDoubleClick={() => setMode(!mode)}>
            <img src={image} alt="cake"/>
            <div className="container1">
                <h3><b>{props.info}</b></h3> 
                <h5>name: {props.d.sName}</h5>
                <h5>price: {props.d.sPrice}</h5> 
                <h5>Cook time: {props.d.cook_time}</h5>  
            </div>
        </div>
        : 
        <div className="card1" onDoubleClick={() => setMode(!mode)}>
            <div className="container1">
                <h3><b>{props.info}</b></h3> 
                <h5>name: </h5>
                <input type="text" name="sName" value={inputs.sName || ""} onChange={handleChange}/>
                <h5>price: </h5>
                <input type="text" name="sPrice" value={inputs.sPrice || ""} onChange={handleChange}/>
                <h5>cook time: </h5>  
                <input type="text" name="cook_time" value={inputs.cook_time || ""} onChange={handleChange}/> 
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
            {data.map((d) => <Card d={d} info={'Sweets info'} type={'UPDATE'}/>)}
            <Card d={{}} info={'ADD NEW**'} type={'INSERT'}/>
        </>
        
    )
}
export default function Sweets(props) {
    return (
            <>
                <h1 className='myclass'>Sweets</h1> 
                {addCards(props.data)}
            </>
        )
}