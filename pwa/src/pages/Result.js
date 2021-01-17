import React from 'react';
import './Result.css';
import Logo from '../images/logo.png';
import {Radar} from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Result extends React.Component {
  constructor() {
    super()
      this.state = {
        nome: 'Mariana',
        feedback: 'Neste sentido, o desenvolvimento contínuo de distintas formas de atuação garante a contribuição de um grupo importante na determinação dos métodos utilizados na avaliação de resultados.',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Ago'],
          datasets: [
            {
              label: 'Habilidades',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [65, 59, 80, 81, 56, 55, 80, 80]
            }
          ]
        }
      }
  }
  
  componentDidMount(props) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: "Token be5c0a523cc889964ecf7a5f50e4b7dc6ba51b01",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "identificacao_individual" : ["decoraunha"],
        "competencias" : ["vendas"],
        "se_ve_trabalhando" : ["curso"],
        "visao_de_mundo" : ["solidariedade"]
    })
    // ...      this.props.chatbot
    };
    fetch('https://bussolar.herokuapp.com/api/perfil', requestOptions)
      .then(res => res.json())
      .then(json => console.log(json))
  }

  render () {
    const { data, nome, feedback } = this.state;
    return (
      <>
        <div className="left-man" />
        <div className="right-center-yellow" />
        <main className="wrap-result">
          <header>
            <img src={Logo} alt="Bussolar >" width="100" />
          </header>
          <div className="feedback">
            <h1>Olá, {nome}!</h1>
            <p>{feedback}</p>
          </div>
          <div className="wrap-radar">
            <Radar
              data={data}
              width={200}
              height={0}
              options={{
                maintainAspectRatio: false
              }}
              />
          </div>
          <div className="areas">
            <h2 className="title-areas">Áreas sugeridas</h2>
            <section className="area">
              <h4 className="area-title">Estética</h4>
              {/* <FontAwesomeIcon icon={['fas', 'fa-angle-down']} size="20" color="black" /> */}
              <div className="cases">
                <h4># Cases / Dicas</h4>
                <div className="video">
                  <iframe title="Greo097mhqI" width="100%"src="https://www.youtube.com/embed/Greo097mhqI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  <h5>4 DICAS de OURO para quem está começando a trabalhar em Estética!</h5>
                </div>
                <h5># Oportunidades</h5>
                <div className="oportunidade">
                  <p>Empreendedor - texto</p>
                </div>
                <div className="oportunidade">
                  <p>Profissão - texto</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </>
    )
  }
}
