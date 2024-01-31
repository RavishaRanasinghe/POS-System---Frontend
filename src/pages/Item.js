import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Item = () => {
    const params = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        getItem();
    }, [getItem]);

    const getItem = () => {
        fetch(`http://localhost:8080/item/${params.id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setItem(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {item && (
                <div>
                    <h1>{item.name}</h1>
                    <div>Quantity: {item.qty}</div>
                    <div>Price: {item.price}</div>
                </div>
            )}
        </>
    );
};

export default Item;
