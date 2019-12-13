import React from 'react'
import {  withRouter } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

import api from '../../services/api'
import { login }  from '../../services/auth'

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        error: "",
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
            <MDBContainer>
                <MDBRow className="d-flex justify-content-center pt-5 mt-5">
                  <MDBCol md="5">
                    <MDBCard>
                      <MDBCardBody>
                        <form onSubmit={this.handleSignIn}>
                          <p className="h3 text-center py-4">Faça login</p>
                          <div className="grey-text">
                          {this.state.error && <p class="text-center text-danger ">{ this.state.error }</p>}
                          {this.state.loading && <div class="spinner-border text-primary">
                            <span class="sr-only"></span>
                          </div>}
                            <MDBInput
                              label="E-mail"
                              group
                              type="email"
                              validate
                              error="wrong"
                              success="right"
                              onChange={e => this.setState({ email: e.target.value })}
                            />
                            <MDBInput
                              label="Senha"
                              group
                              type="password"
                              validate
                              onChange={e => this.setState({ password: e.target.value })}
                            />
                          </div>
                          <div className="text-center py-4 mt-3">
                            <MDBBtn color="primary" type="submit">
                              Entrar
                            </MDBBtn>
                          </div>
                        </form>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default withRouter(Login) 