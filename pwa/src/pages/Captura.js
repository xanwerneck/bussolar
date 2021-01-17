import React from "react";
import Logo from '../images/logo.png';
import { Container, Button, Form, FormGroup, FormInput } from "shards-react";
import './Captura.css';
import { Link } from "react-router-dom";
import { login, setName } from "../utils/auth";

class Captura extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nome : "",
            email : "",
            data_nascimento : ""
        }
    }

    acessar = async (e) => {
        const { nome, email, data_nascimento } = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, data_nascimento })
          };
        const fetchData = await fetch('https://bussolar.herokuapp.com/api/acesso', requestOptions);
        const json = await fetchData.json();
        login(JSON.stringify(json));
        setName(nome);
    }

    render() {
        const { nome, email, data_nascimento } = this.state;
        return (
            <>
                <div className="left-yellow" />
                <div className="right-blue" />
                <Container className="wrap-captura">
                    <div className="wrap-logo">
                        <img src={Logo} alt="Bussolar >" width="250" />
                    </div>
                    <div className="wrap-form">
                        <h4 className="text-home">
                            Olá, bem-vindo ao Bussolar!
                            <br />
                            Que tal falarmos sobre você antes de qualquer coisa?
                            Assim, a gente já troca os nossos contatos.
                        </h4>
                        <Form>
                            <FormGroup>
                                {/* <label htmlFor="#email">Nome</label> */}
                                <FormInput 
                                id="#nome" placeholder="Nome" className="nome"
                                value={nome}
                                onChange={(event) => this.setState({nome : event.target.value})}
                                />
                            </FormGroup>
                            <FormGroup>
                                {/* <label htmlFor="#email">E-mail</label> */}
                                <FormInput 
                                    id="#email" placeholder="E-mail" className="email"
                                    value={email}
                                    onChange={(event) => this.setState({email : event.target.value})}
                                />
                            </FormGroup>
                            <FormGroup>
                                {/* <label htmlFor="#idade">Idade</label> */}
                                <FormInput 
                                    type="date"
                                    id="#data_nascimento"
                                    placeholder="D. Nascimento"
                                    className="data_nascimento"
                                    value={data_nascimento}
                                    onChange={(event) => {this.setState({data_nascimento : event.target.value})}}
                                />
                            </FormGroup>
                        </Form>
                        <Link to='/chatbot' >
                            <Button pill block className="bt-captura"
                                onClick={this.acessar}
                            >
                                iniciar trilha
                            </Button>
                        </Link>
                    </div>
                </Container>
            </>
        )
    }
}

export default Captura;