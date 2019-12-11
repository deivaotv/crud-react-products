import React from 'react'
import { withRouter } from 'react-router-dom'

import api from '../../services/api'

class Store extends React.Component {
    state = {
        name: "",
        description: "",
        price: ""
    }

    handleStore =  async e => {
        e.preventDefault()
        const { name, description, price } = this.state

        if (!name || !description || !price ) {
            this.setState( { error: "Preencha os campos"})
        } else {
            try {
                api.post("products", { name, description, price })
                this.props.history.push("/products")
            } catch (err) {
                this.setState({
                    error: "Houve um problema"
                })
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Register Product</h1>
                <form onSubmit={this.handleStore}>
                    <input 
                    placeholder="name" 
                    onChange={e => this.setState({ name: e.target.value})}
                    />
                    <br />
                    <input 
                    placeholder="description" 
                    onChange={e => this.setState({ description: e.target.value})}
                    />
                    <br />
                    <input 
                    placeholder="price"
                    onChange={e => this.setState({ price: e.target.value})}
                    />
                    <br />
                    <button>Enviar</button>

                </form>
            </div>
        )
    }
}

export default withRouter(Store)