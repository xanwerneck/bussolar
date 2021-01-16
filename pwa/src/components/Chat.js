
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
            mensagem : ""
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
                getResponse(intent.name, (data) => {
                    console.log(data)
                    if (data.link) {
                        this.props.addMensagem('Olha o que eu achei, esse documento que pode ajudar você com essa dúvida, basta clicar nele para acessar.', 'left')   
                        this.props.addMensagem(data.message, 'left', 'file', data.link, data.nome_arquivo) 
                    } else {
                        this.props.addMensagem(data.message, 'left')
                    }
                })
            }
            
        })
    }

    render(){
        return (
            <Card>
                <CardHeader>
                    <FontAwesomeIcon icon={faRobot}/>
                    Assistente virtual do Malte
                </CardHeader>
                <CardBody>
                <MessageList
                    style={{height: 100}}
                    className='message-list'
                    lockable={true}
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