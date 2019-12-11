import React from 'react'
import api from '../../services/api'

class Products extends React.Component {
    state = {
        products:[]
    }

    componentDidMount() {
        api.get("/products")
            .then(res => res.data) 
            .then((data) =>{
                this.setState( { products: data })
                console.log(this.state.products)              
            })
    }
    destroy(id) {
        api.delete(`products/${id}`)
        this.props.history.push("/products")
    }

    render(){
        return (
            <div>
                <h1>Products</h1>
                { this.state.products.map((products) => (
                        <ul key={products.id}>
                            <li>
                                <a  href={`http://localhost:3000/product/${products.id}`}>
                                {products.name}
                                </a>
                            </li>
                            <li>{products.description}</li>
                            <li>{products.price}</li>
                            
                        </ul>
                ))}
                <a href="http://localhost:3000/products-store">Register new</a>
            </div>
        )
    }

}

export default Products