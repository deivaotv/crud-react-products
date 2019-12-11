import React from 'react'
import {  withRouter } from "react-router-dom";

import api from '../../services/api'
import { login }  from '../../services/auth'

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        error: ""
    }

    handleSignIn = async e => {
        e.preventDefault()
        const { email, password } = this.state

        if (!email || !password) {
            this.setState( { error : "Preencha e-mail e senha para continuar" })
        } else {
            try {
                const response = await api.post("/login", { email, password })
                login(response.data.token)
                this.props.history.push("/products")
            } catch (err) {
                this.setState({
                    error: "Houve um problema com o login"
                })
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSignIn}>
                {this.state.error && <p>{this.state.error}</p>}
                    <input 
                    type="email"
                    placeholder="Email"
                    onChange={e => this.setState({ email: e.target.value })} 
                    />
                    <br />
                    <input 
                    type="password"
                    placeholder="Senha"
                    onChange={e => this.setState({ password: e.target.value })}
                    />
                    <br />
                    <button>Logar</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login) 