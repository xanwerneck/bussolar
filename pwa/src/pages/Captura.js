import React from "react";
import Logo from '../images/logo.png'
import { Container, Button, Form, FormGroup, FormInput } from "shards-react";
import './Captura.css';

export default class Captura extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nome : "",
            email : "",
            idade : ""
        }
    }

    acessar = () => {
        this.props.history.push('/inicio')
    }

    render() {
        return (
            <>
                <div className="left-yellow" />
                <div className="right-blue" />
                <Container className="wrap-captura">
                    
                    <div className="wrap-logo">
                        <img src={Logo} alt="Bussolar >" width="250" />
                    </div>
                    <div style={{marginTop: '50px'}}>
                        <h4 className="text-home">
                            Olá, bem-vindo ao Bussolar, que tal falarmos sobre você antes de qualquer coisa?
                            Assim, a gente já troca os nossos contatos.
                        </h4>
                        <Form>
                            <FormGroup>
                                {/* <label htmlFor="#email">Nome</label> */}
                                <FormInput 
                                id="#nome" placeholder="Nome" className="nome"
                                onChange={(event) => this.setState({nome : event.target.value})}
                                />
                            </FormGroup>
                            <FormGroup>
                                {/* <label htmlFor="#email">E-mail</label> */}
                                <FormInput 
                                id="#email" placeholder="E-mail" className="email"
                                onChange={(event) => this.setState({email : event.target.value})}
                                />
                            </FormGroup>
                            <FormGroup>
                                {/* <label htmlFor="#idade">Idade</label> */}
                                <FormInput type="date" id="#idade" placeholder="Data de nascimento" className="idade"
                                onChange={(event) => {this.setState({idade : event.target.value})}}
                                />
                            </FormGroup>
                        </Form>
                        <Button pill block className="bt-captura"
                        onClick={() => this.acessar()}
                        >
                            iniciar trilha
                        </Button>
                    </div>
                </Container>
            </>
        )
    }
}

{/* <Button pill block className="bt-captura"
onClick={() => this.acessar()}
>
    iniciar trilha
</Button> */}