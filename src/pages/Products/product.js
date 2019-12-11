import React from 'react'
import api from '../../services/api'

class Product extends React.Component{
    state = {
        product:''
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        api.get(`/products/${id}`)
            .then(res => res.data)
            .then((data) =>{
                this.setState( { product: data })
                console.log(this.state.product)
            })
    }

    render() {
        return (
            <div>
                <h1>{this.state.product.name}</h1>
                <h2>{this.state.product.description}</h2>
            </div>
        )
    }
}

export default Product