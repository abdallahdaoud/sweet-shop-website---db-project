import { useState, useContext } from 'react';
import {UserContext} from '../index';
import axios from 'axios';
import local from '../local.js';

function RequestBar() {
  const [req, setreq] = useState("all");
  const [queryNum, setQueryNum] = useState(() => 1);

  let path = window.location.pathname.slice(1,);
  path = path ? path : 'Sweets';
  const setdbResponse = useContext(UserContext);
  function handleSubmit() {
    setdbResponse(values => ({...values, 'dbtable':path, 'dbrequest':req, 'dbtype':'SELECT', 'run':!values['run']}));
  }
  async function handleQuery() {
    try {
      let request;
      if(queryNum == 1) request = `select year(OrderDate) as year,month(OrderDate) as month,count(price) as monthly_profit 
        from SweetsShop.orders group by year(OrderDate),month(OrderDate) order by year(OrderDate),month(OrderDate)`;
      else if(queryNum == 2) request = `select Sweet_name,year(OrderDate) as year,month(OrderDate) as month,count(price) as monthly_profit from SweetsShop.orders group by Sweet_name,year(OrderDate),month(OrderDate) order by Sweet_name,year(OrderDate),month(OrderDate)`;
      else if(queryNum == 3) request = `select year(OrderDate) as year,month(OrderDate) as month, sum(cast(price as double)) 
        as monthly_profit from SweetsShop.orders group by year(OrderDate),month(OrderDate) order by year(OrderDate),month(OrderDate)`;
      else if(queryNum == 4) request = `SELECT SUM(cast(price as double)) FROM Orders`;
      else if(queryNum == 5) request = `SELECT cName, phone, COUNT(customers_phone) FROM Orders LEFT JOIN Customers 
        ON customers_phone = phone group by customers_phone order by COUNT(customers_phone) desc`;
      else if(queryNum == 6) request = `SELECT cName, phone, SUM(cast(price as double)) FROM Orders LEFT JOIN Customers ON 
        customers_phone = phone group by customers_phone order by SUM(cast(price as double)) desc`;
      else if(queryNum == 7) request = `SELECT cName, phone, MIN(cast(year(OrderDate) as double)), 
        MIN(cast(month(OrderDate) as double)), MIN(cast(day(OrderDate) as double)) FROM Orders LEFT JOIN Customers 
        ON customers_phone = phone group by customers_phone order by MIN(cast(OrderDate as double)) asc`;
      else if(queryNum == 8) request = `select year(OrderDate) as year,month(OrderDate) as month,AVG(cast(price as double)) as 
        AVG_Month_Price,count(month(OrderDate)) as Num_Of_Orders from sweetsshop.orders group by year(OrderDate), month(OrderDate)`;
      else if(queryNum == 9) request = `select year(OrderDate) as year,month(OrderDate) as month,sum(cast(price as double)) as 
        Sales_Month_Price,count(month(OrderDate)) as Num_Of_Orders from sweetsshop.orders group by year(OrderDate), month(OrderDate)`;
      else if(queryNum == 10) request = `select count(Sweets.sName) as Number_Of_Sweets from Sweets`;

      let response = await axios.get("http://" + local + ":9000/" + request);
      
      if(queryNum == 1) response = response.data.reduce((str, arr) => `${str}\n${arr[0]}/${arr[1]}: ${arr[2]}`,'___Sweets Per Month___');
      else if(queryNum == 2) response = response.data.reduce((str, arr) => `${str}\n${arr[0]}: ${arr[3]} times in ${arr[1]}/${arr[2]}`,'___Sold Sweet Per Month___');
      else if(queryNum == 3) response = response.data.reduce((str, arr) => `${str}\n${arr[0]}/${arr[1]}: ${arr[2]}`,'___Sales Per Month___');
      else if(queryNum == 4) response = response.data.reduce((str, arr) => `${str}\n${arr[0]}`,'___All Sales Sum___');
      else if(queryNum == 5) response = response.data.reduce((str, arr) => `${str}\n${arr[0]}(${arr[1]}): ${arr[2]}`,'___Customer Orders Num___');
      else if(queryNum == 6) response = response.data.reduce((str, arr) => `${str}\n${arr[0]}(${arr[1]}): ${arr[2]}`,'___All Sales Per Customer___');
      else if(queryNum == 7) response = response.data.reduce((str, arr) => `${str}\n${arr[0]}(${arr[1]}): ${arr[2]}-${arr[3]}-${arr[4]}`,'___Customer Date Join___');
      else if(queryNum == 8) response = response.data.reduce((str, arr) => `${str}\n${arr[0]}/${arr[1]}: ${arr[2]}, ${arr[3]}`,'___Monthly Sales Average Per Order and Orders Num___');
      else if(queryNum == 9) response = response.data.reduce((str, arr) => `${str}\n${arr[0]}/${arr[1]}: ${arr[2]}, ${arr[3]}`,'___Sales and Orders Per Month___');
      else if(queryNum == 10) response = response.data.reduce((str, arr) => `${str}\n${arr}`,'___Num of Sweets___');

      alert(response);
    }
    catch { alert("Error In Command"); }
  }

  return (
    <>
      <div id="selectData">
        <button onClick={handleSubmit}>{'SELECT>'}</button>
        <input 
          type="text" 
          value={req}
          onChange={(e) => setreq(e.target.value)}
          onKeyDown={(event) => {if(event.key === "Enter") handleSubmit()}}
        />
      </div>
      <div id="queryReports">
        <span>Query Reports:</span>
        <b onClick={() => setQueryNum(queryNum>1 ? queryNum-1 : queryNum)}>&#8826; </b>
        <button onClick={() => handleQuery()}>
          {queryNum === 1 && 'Sweets Per Month'}
          {queryNum === 2 && 'Sold Sweet Per Month'}
          {queryNum === 3 && 'Sales Per Month'}
          {queryNum === 4 && 'All Sales Sum'}
          {queryNum === 5 && 'Customer Orders Num'}
          {queryNum === 6 && 'All Sales Per Customer'}
          {queryNum === 7 && 'Customer Date Join'}
          {queryNum === 8 && 'Monthly Sales Average'}
          {queryNum === 9 && 'Sales & Orders Per Month'}
          {queryNum === 10 && 'Num of Sweets'}
          {' (' + queryNum + ')'}
        </button>
        <b onClick={() => setQueryNum(queryNum<10 ? queryNum+1 : queryNum)}> &#8827;</b>
      </div>
    </>
  );
};
export default RequestBar;
