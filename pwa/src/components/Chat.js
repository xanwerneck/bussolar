
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { MessageList, Input, Button } from 'react-chat-elements'
import { Card, CardBody, CardFooter, CardHeader } from "shards-react";
import { getIntent, getResponse } from "../common/chatbot";

export default class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mensagem : "",
            caminho : [],
            entities : []
        }
    }

    inputRef = React.createRef();

    enviar = () => {
        if (this.state.mensagem == "") {
            alert('Informe a mensagem antes de submeter')
            return
        }
        var mensagem = this.state.mensagem
        this.props.addMensagem(mensagem, 'right')
        this.setState({
            mensagem : ""
        })
        this.inputRef.clear()

        getIntent(mensagem)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.intents.length == 0) {
                this.props.addMensagem("Não consegui entender a sua mensagem, podemos tentar novamente?", 'left') 
            }else{
                var intent = res.intents[0]
                if (intent.name == "sei_o_que_fazer") {
                    this.props.addMensagem("Ja entendemos as suas respostas, acho que podemos falar de algumas coisas mais específicas, a gente preparou essas informações para você, se quiser conferir, é só clicar nesse link aqui abaixo.", 'left') 
                    this.props.concluir(this.state.caminho, 'sei_o_que_fazer')
                    return
                }
                if (intent.name == "focar_ideia") {
                    this.props.addMensagem("Sabe o que eu me lembrei? Já ouviu falar de Multipotencial? Dá uma olhada nesse link que deixei para vc. Ah, tem também alguns feedbacks baseados no nossa conversa por aqui", 'left') 
                    this.props.concluir(this.state.caminho, 'focar_ideia')
                    return
                }
                var entities = Object.keys(res.entities).map(key => res.entities[key][0].name)
                this.setState({
                    caminho : [...this.state.caminho, {'intent' : intent.name, 'entities' : entities}],
                    entities : entities
                })
                getResponse(intent.name)
                .then(res => res.json())
                .then(data => {
                    if (data.message.arquivo) {
                        this.props.addMensagem(data.message.mensagem, 'left')   
                        this.props.addMensagem(data.message.mensagem, 'left', 'photo', null) 
                    } else {
                        this.props.addMensagem(data.message.mensagem, 'left')
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.props.addMensagem("Não consegui entender a sua mensagem, podemos tentar novamente?", 'left')
                })
            }
            
        })
    }

    render(){
        return (
            <Card>
                <CardHeader>
                    <FontAwesomeIcon 
                    style={{marginRight: 10}}
                    icon={faRobot}/>
                    Oi... Eu sou o <b>Busso</b>
                </CardHeader>
                <CardBody>
                <MessageList
                    style={{height: 100}}
                    className='message-list'
                    lockable={false}
                    toBottomHeight={'100%'}
                    dataSource={this.props.message_list}
                    onClick={(message) => {
                        if (message.link) {
                            window.open(message.link)
                        }
                    }}
                    />
                </CardBody>
                <CardFooter>
                <Input
                placeholder="digite aqui a sua dúvida..."
                multiline={true}
                value={this.state.mensagem}
                ref={el => (this.inputRef = el)}
                onChange={(event) => this.setState({
                    mensagem : event.target.value
                })}
                rightButtons={
                    <Button
                        onClick={() => this.enviar()}
                        color='white'
                        backgroundColor='black'
                        text='Enviar'/>
                }/>
                </CardFooter>
            </Card>
        )
    }    
}