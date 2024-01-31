import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {

    const[categories ,  setCategories] = useState(null);
    const[newCategory, setNewCategory] = useState(null);

    useEffect(()=>{
        getCategories();
    }, []);


    const getCategories = () => {
        fetch('http://localhost:8080/category')
        .then((response)=>{
            return response.json();
        }).then((data)=>{
            setCategories(data);
        }).catch((error)=>{
            console.log(error);
        })

        
    }

            const handleInput = (event) =>{
                setNewCategory(event.target.value);
               }

               const createCategory = (event) => {
                    event.preventDefault();

                    const data = {
                    "name": newCategory
                    }

                    fetch("http://localhost:8080/category",{
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


    return (
        <div>
            <h1>Categories</h1>
            {categories && 
                <ul>
                    {categories.map((category) => (
                        <li>
                            <Link to = {`/category/${category.id}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            }
            <h2>Create Category</h2>
            <form onSubmit={createCategory}> 
                <label>Category name</label>
                <input type="text" required onChange={handleInput}/>
                <button type="submit">Save Category</button>
            </form>
        </div>
    )
}

export default Categories;