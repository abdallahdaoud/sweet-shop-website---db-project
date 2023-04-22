import {Outlet, Link} from "react-router-dom";
import RequestBar from '../pages/RequestBar';

const Layout = () => {
    return (
        <>
            <nav className='.nav'>
                <ul>
                    <li>
                        <Link to='/' >Sweets</Link>
                    </li>
                    <li>
                        <Link to='/Customers' >Customers</Link>
                    </li>
                    <li>
                        <Link to='/Ingredients' >Ingredients</Link>
                    </li>
                </ul>
                <RequestBar />
            </nav>
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}
export default Layout;