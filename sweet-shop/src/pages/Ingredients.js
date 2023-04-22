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
        setdbResponse(values => ({...values, 'dbtable':'Ingredients', 'dbrequest':inputs, 
            'dbtype':type, 'tableKey':['iName', props.d.iName], 'run':!values['run']}));
        if(type === 'INSERT') setInputs({});
    }

    return ( mode ? 
        <div className="card1" onDoubleClick={() => setMode(!mode)}>
            <img src={image} alt="Ingredient"/>
            <div className="container1">
                <h3><b>{props.info}</b></h3> 
                <h5>name: {props.d.iName}</h5>
                <h5>Price: {props.d.iPrice}</h5> 
                <h5>Company: {props.d.company}</h5> 
                <h5>Bring time: {props.d.bring_time}</h5> 
            </div>
        </div>
        : 
        <div className="card1" onDoubleClick={() => setMode(!mode)}>
            <div className="container1">
                <h3><b>{props.info}</b></h3> 
                <h5>name: </h5>
                <input type="text" name="iName" value={inputs.iName || ""} onChange={handleChange}/>
                <h5>price: </h5>
                <input type="text" name="iPrice" value={inputs.iPrice || ""} onChange={handleChange}/>
                <h5>company: </h5>
                <input type="text" name="company" value={inputs.company || ""} onChange={handleChange}/>
                <h5>bring time: </h5>
                <input type="text" name="bring_time" value={inputs.bring_time || ""} onChange={handleChange}/>
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
            {data.map((d) => <Card d={d} info={'Ingredients info'} type={'UPDATE'}/>)}
            <Card d={{}} info={'ADD NEW**'} type={'INSERT'}/>
        </>
    )
}
export default function Ingredients(props) {
    return (
            <>
                <h1 className='myclass'>Ingredients</h1> 
                {addCards(props.data)}
            </>
        )
}