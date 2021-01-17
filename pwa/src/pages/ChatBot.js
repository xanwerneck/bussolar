import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
    Button,
    Container
  } from "shards-react";
import Chat from "../components/Chat";
import Menu from "../components/Menu";
import './type.css'
import Logo from '../images/logo.png';
import { getName } from "../utils/auth";

export default class ChatBot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message_list : [],
            concluido : false,
            caminho : []
        }
    }
    componentDidMount() {
        this.addMensagem('Oi, ' + getName() + ' ;) . O papo vai ser assim, a gente troca uma ideia sobre coisas mais individuais suas primeiro, tudo bem? Exemplo, fala pra mim, o que você ama fazer, sabe, aquilo que você faria ou faz todo dia?', 'left')
    }

    addMensagem = (message, side, type = 'text', link = '', nome_arquivo = '') => {
        var message_new = {
            position: side,
            type: type ? type : "text",
            text: nome_arquivo ? nome_arquivo : message,
            data : link ? {
                uri: link,
                status: {
                    click: false,
                    loading: 0,
                }
            } : null,
            date: new Date(),
            link : link
        }
        this.setState({
            message_list : [...this.state.message_list, message_new]
        })
    }

    concluir = (caminho) => {
        this.setState({concluido : !this.state.concluido, caminho : caminho})
    }

    irResultado = () => {
        
        var identificacao_individual = this.state.caminho.filter(item => (item.intent == "identificacao_individual"))
        var competencias = this.state.caminho.filter(item => (item.intent == "competencias"))
        var se_ve_trabalhando = this.state.caminho.filter(item => (item.intent == "se_ve_trabalhando"))
        var visao_de_mundo = this.state.caminho.filter(item => (item.intent == "visao_de_mundo"))
        var id = []
        if (identificacao_individual.length > 0) {
            id = identificacao_individual[0].entities
        }
        var co = []
        if (competencias.length > 0) {
            co = competencias[0].entities
        }
        var se = []
        if (se_ve_trabalhando.length > 0) {
            se = se_ve_trabalhando[0].entities
        }
        var vi = []
        if (visao_de_mundo.length > 0) {
            vi = visao_de_mundo[0].entities
        }
        var data = {
            "identificacao_individual" : id,
            "competencias" : co,
            "se_ve_trabalhando" : se,
            "visao_de_mundo" : vi
        }
        this.props.history.push({
            pathname : '/result',
            state : {
                data
            }
        })
    }

    render() {
        return (
            <Container style={{position: "absolute", zIndex: 3}}>
                <div className="wrap-logo" style={{marginBottom: 10}}>
                    <img src={Logo} alt="Bussolar >" width="100" />
                </div>
                <Chat 
                message_list={this.state.message_list}
                addMensagem={this.addMensagem}
                concluir={this.concluir}
                />
                {
                    this.state.concluido ? (
                        <div style={{margin: 15, marginTop: 30}}>
                            <Button pill block
                            className="bt-captura"
                            onClick={()=>this.irResultado()}
                            >
                                Mostre meus resultados
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                        </div>
                    ) : null
                }                
            </Container>
        )
    }
}