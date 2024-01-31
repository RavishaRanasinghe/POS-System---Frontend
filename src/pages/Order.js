import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";

const Order = () => {

    const [items, setItems] = useState(null);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);

    const getItems = async () => {
        const response = await axios.get("http://localhost:8080/item");
        setItems(response.data);
    }

    useEffect(() => {
        getItems();
    }, [])

    const calculateTax = (total) => {
        setTax(total / 100 * 15);
    }

    const createOrder = async () => {
        const itemIds = orders.map(item => item.id); // Assign IDs of the items to a single array

        const data = {
            "items": itemIds
        }

        const response = await axios.post("http://localhost:8080/orders", data);

        if (response.status === 200) {
            setOrders([]);
            setTotal(0);
            setTax(0);
        } else {
            // Show error msg
        }
    }

    useEffect(() => {
        calculateTax(total); // Whenever total state object changes, this gets triggered
    }, [total])

    return (
        <div className="container-fluid">
            <div className="heading text-center">
                <h1>Orders</h1>
            </div>

            <div className="row">

                <div className="col-md-6">
                    <h2>Items</h2>
                    {items && items.map(item => (
                        <div key={item.id} className="item shadow-sm bordered 
                        bg-light px-3 py-3 mb-3">
                            <div className="row">
                                <div className="col">
                                    <h5>{item.name}</h5>
                                    <h6>{item.price}</h6>
                                </div>
                                <div className="col text-end">
                                    <button className="btn btn-primary"
                                        onClick={() => {
                                            setOrders([...orders, item]);
                                            setTotal(total + item.price); 
                                            
                                        }}>Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-md-6">
                    <h2>Orders</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Item Id</th>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(item => (  // Fix: Change 'items' to 'orders'
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-secondary" onClick={createOrder}>Complete
                     Order</button>
                </div>

            </div>
        </div>
    )
}

export default Order;
