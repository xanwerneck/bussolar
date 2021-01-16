import React from "react";
import { Container, Row, Button, Form, FormGroup, FormInput } from "shards-react";

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
            <Container >
                <div style={{textAlign: "center"}}>
                    <img src="/images/logo-horizontal.jpg" width="96" style={{borderRadius: 10}} />
                </div>
                <div style={{marginTop: '20vh'}}>
                    <h4
                    style={{color: "#2b0600", marginBottom: 30}}
                    >
                        Olá, bem-vindo ao Bussolar, que tal falarmos antes de qualquer coisa sobre você? Assim, a gente já troca os nossos contatos.
                    </h4>
                    <Form>
                        <FormGroup>
                            <label htmlFor="#email">Nome</label>
                            <FormInput 
                            id="#email" placeholder="Nome" 
                            onChange={(event) => this.setState({nome : event.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#email">E-mail</label>
                            <FormInput 
                            id="#email" placeholder="E-mail" 
                            onChange={(event) => this.setState({email : event.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#idade">Idade</label>
                            <FormInput type="idade" id="#idade" placeholder="idade" 
                            onChange={(event) => {this.setState({idade : event.target.value})}}
                            />
                        </FormGroup>
                    </Form>
                    <Button pill block style={{backgroundColor: "#8c0406", border: 0}}
                    onClick={() => this.acessar()}
                    >
                        <strong>Bora começar</strong>
                    </Button>
                </div>
            </Container>
        )
    }
}