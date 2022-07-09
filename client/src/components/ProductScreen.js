import React from 'react'
import {useParams} from 'react-router-dom';
function ProductScreen() {
    const params=useParams();
    const {id}=params;
    return (
        <div>
            <p>{id}</p>
        </div>
    )
}

export default ProductScreen
