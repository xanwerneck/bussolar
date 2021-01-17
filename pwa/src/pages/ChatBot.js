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
        this.addMensagem('O papo vai ser assim, a gente troca uma ideia sobre coisas mais individuais suas primeiro, tudo bem? Exemplo, fala pra mim, o que você ama fazer, sabe, aquilo que você faria ou faz todo dia?', 'left')
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

    render() {
        return (
            <>
                <Menu 
                    goLogin={() => this.props.history.push('/login')}
                />
                <Container>
                <Chat 
                message_list={this.state.message_list}
                addMensagem={this.addMensagem}
                concluir={this.concluir}
                />
                {
                    this.state.concluido ? (
                        <div style={{margin: 15, marginTop: 30}}>
                            <Button pill block
                            style={{backgroundColor: "#8C0406", border: 0, fontSize: 20}}
                            onClick={()=>this.props.history.goBack()}
                            >
                                Mostre meus resultados
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                        </div>
                    ) : null
                }                
                </Container>
                
            </>
        )
    }
}