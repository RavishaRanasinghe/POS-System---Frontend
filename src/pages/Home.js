import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";


const Home = () =>{

            const [items, setItems] = useState(null);
            const [categories, setCategories] = useState(null);
            const[name, setName] = useState(null);
            const[price, setPrice] = useState(null);
            const[quantity, setQuantity] = useState(null);
            const[categoryId, setCategoryId] = useState(null);

            useEffect(() => {
                getItems();
                getCategories();
                
            },[])

            const navigate = useNavigate();

        const getItems = () =>{
            try {
                const response = axios.get("http://localhost:8080/item");
                setItems(response.data);
            } catch (error) {
                if(error.response.status === 401){
                    navigate("/login");
                }
            }
        }

        const getCategories = () => {
            try {
                const response = axios.get("http://localhost:8080/category");
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            } 
        }

        const handleName = (event) =>{
            setName(event.target.value);
           }
           const handlePrice = (event) =>{
            setPrice(event.target.value);
           }
           const handleQuantity = (event) =>{
            setQuantity(event.target.value);
           }
           const handleCategory = (event) =>{
            setCategoryId(event.target.value);
           }

        const createItem = (event) => {
            event.preventDefault();

            const data = {
            "name": name,
            "price": price,
            "quantity": quantity,
            "categoryId": categoryId
            }

            fetch("http://localhost:8080/item",{
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            }).then((response) =>{
                return response.json();
            }).then((data) => {
                console.log(data);
            }).catch((error) =>{
                console.log(error);
            })
       }

    return(
        <div>
            <h1>Home</h1>
            <Link to="/item">Items</Link>
            <button className="btn btn-primary" onClick={getItems}>Load Items</button>

                    {items &&
                        <ul>
                            {items.map((item) =>(
                                <li key={item.id}>
                                    <Link to={`/item/${item.id}`}>
                                        {item.name}</Link>
                                </li>
                            ))}
                        </ul>                   
                    }

<button onClick={getCategories}>Load Categories</button>

{categories &&
    <ul>
        {categories.map((category) =>(
            <li key={category.id}>{category.name}</li>
        ))}
    </ul>
}

<h2>Create Item</h2>
            <form onSubmit={createItem}> 
                <div>
                    <label>Item name</label>
                <input type="text" required onChange={handleName}/>
                </div>
                <div>
                    <label>Item price</label>
                <input type="text" required onChange={handlePrice}/>
                </div>
                <div>
                    <label>Item Quantity</label>
                <input type="text" required onChange={handleQuantity} />
                </div>
                <div>
                    <label>Category</label>
                <select required onChange={handleCategory}>
                    <option>Please Select</option>
                    {categories && categories.map((category) => (
                        <option value={category.id}>{category.name}</option>
                    ))}
                </select>
                </div>
                <button type="submit">Save Item</button>
            </form>
        </div>
    )  
}
export default Home;