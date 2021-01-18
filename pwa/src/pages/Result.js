import React from 'react';
import './Result.css';
import Logo from '../images/logo.png';
import {Radar} from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getName, getToken } from '../utils/auth';
import Loading from '../components/Loading';

export default class Result extends React.Component {
  constructor() {
    super()
    this.handleState = this.handleState.bind(this);
      this.state = {
        nome: getName(),
        feedback: null,
        data: {
          labels: ['', '', '', '', '', '', '', ''],
          datasets: [
            {
              label: 'Habilidades',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        }
      }
  }

  handleState(json) {
    const { habilidades, perfils, texto_empreendedor, texto_personalidade } = json;
    const { labels, datasets } = habilidades;
    const { data } = datasets[0];
    this.setState({ 
      perfils,
      feedback: texto_personalidade,
      data: { 
        labels,
        datasets: [{
          label: 'Habilidades',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data
        }]
      }
    })
    console.log(data)
  }
  
  componentDidMount(props) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: "Token " + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.location.state.data)     
    };
    fetch('https://bussolar.herokuapp.com/api/perfil', requestOptions)
      .then(res => res.json())
      .then(json => this.handleState(json))
  }


  page() { 
    const { data, nome, feedback, perfils } = this.state;
    console.log(perfils)
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
            
              {perfils.map((perfil) => {
                return (
                  <section className="area">
                    <h4 className="area-title">{perfil.descricao}</h4>
                    <h4 className="sub-title-area"># Cases / Dicas</h4>
                    {perfil.cases.map((eachCase) => {
                      const link = eachCase.link.split('https://www.youtube.com/watch?v=')[1];
                      const titlevideo = eachCase.titulo;
                      return (
                        <div className="cases">
                          <div className="video">
                            <iframe title={titlevideo} width="100%"src={`https://www.youtube.com/embed/${link}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <h5>{titlevideo}</h5>
                          </div>
                        </div>
                      );
                    })}
                    <h5># Oportunidades</h5>
                    {perfil.oportunidade_materias[0] && (<h5><strong>Empreendedor</strong></h5>)}
                    {perfil.oportunidade_materias[0] && perfil.oportunidade_materias.map((materia) => {
                      return (
                        <div className="oportunidade">
                          <a href={materia.link} className="title-link">
                            <h4>&gt; {materia.titulo}</h4>
                          </a>
                          <p className="fonte-materia">Fonte: {materia.fonte}</p>
                        </div>
                      );
                    })}
                    {perfil.oportunidade_vagas[0] && (<h5><strong>Profissão</strong></h5>)}
                    {perfil.oportunidade_vagas[0] && perfil.oportunidade_materias.map((materia) => {
                      return (
                        <div className="oportunidade">
                          <a href={materia.link} className="title-link">
                            <h4>&gt; {materia.titulo}</h4>
                          </a>
                          <p className="fonte-materia">Fonte: {materia.fonte}</p>
                        </div>
                      );
                    })}
                    
                  </section>
                  );
                }) 
              }
            
          </div>
        </main>
      </>
    );
   }

  render () {
    const { feedback } = this.state
    return (
      <>
        {!feedback ? <Loading /> : this.page()}
      </>  
    )
  }
}

// {
//   "identificacao_individual" : ["indecisa", "esforcada"],
//   "competencias" : ["marketing_digital", "cuidar_filho"],
//   "se_ve_trabalhando" : [],
//   "visao_de_mundo" : ["futuro_criancas", "pequenos_gestos"]
// }

// {
//   "identificacao_individual" : ["decoraunha"],
//   "competencias" : ["vendas"],
//   "se_ve_trabalhando" : ["curso"],
//   "visao_de_mundo" : ["solidariedade"]
// }