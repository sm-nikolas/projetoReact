import React, { useState, useEffect } from "react"
import FormHistorico from "./FormHistorico"
import '../../css/style.css';

const CadastroHistorico = () => {

    let [idHistorico, setIdHistorico] = useState('')

    const [dadosHistorico, setHistorico] = useState([]);
    const [dadosPilotos, setDadosPilotos] = useState([]);
    const [dadosPista, setDadosPista] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3008/historico-corrida")
            .then(res => res.json())
            .then(
                (res) => {
                    setHistorico(res);
                },
                (error) => {
                    console.log(error)
                }
            )

        fetch("http://localhost:3008/pista")
            .then(res => res.json())
            .then(
                (res) => {
                    setDadosPista(res);
                },
                (error) => {
                    console.log(error)
                }
            )

        fetch("http://localhost:3008/competidores")
            .then(res => res.json())
            .then(
                (res) => {
                    setDadosPilotos(res);
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])



    function refreshPage() {
        window.location.reload();
    }

    const addEdit = obj => {

        if (idHistorico == '') {
            fetch("http://localhost:3008/historico-corrida", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: new Headers({ 'content-type': 'application/json' })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        refreshPage()
                    },
                    (error) => {
                        console.log(error)
                    }
                )

        } else {
            fetch("http://localhost:3008/historico-corrida/" + dadosHistorico[idHistorico].id, {
                method: "PUT",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        refreshPage()
                    },
                    (error) => {
                        console.log(error)
                    });


        }
    }

    function media() {

        let soma = 0;

        dadosHistorico.forEach(element => {

            soma += parseFloat(element.TempoGasto)
        });
        return (soma / dadosHistorico.length).toFixed(2)
    }

    const getDescPista = key => {
        let pista = dadosPista.find(p => p.id == key)
        return pista?.descricao

    }

    const getPistasUtilizadas = () => {
        let pista = dadosPista.filter(p => dadosHistorico.some(h => h.PistaCorridaId == p.id))
        console.log(pista)
        return pista
    }

    const getPilotoNaoParticipou = () => {
        let piloto = dadosPilotos.filter(p => !dadosHistorico.some(h => h.CompetidorId == p.id))
        console.log(piloto)
        return piloto
    }

    const getPiloto = key => {
        let piloto = dadosPilotos.find(p => p.id == key)
        return piloto?.nome

    }




    return (
        <div>

            <div className="jumbotron jumbotron sombra2" id="apresenta">
                <div className="container fonteTitulo">
                    <h1 className="display-4">Cadastre o histórico da sua corrida</h1>
                    <p className="lead">Não se esqueça de cadastrar-se como piloto</p>
                </div>
            </div>
            <div className="row" id="container">
                <div className="col-md-4 offset-md-4">
                    <FormHistorico {...({ addEdit, idHistorico, dadosHistorico })} />
                </div>
            </div>
            <div className="row container" id="container">
                <div className="col-md-6">
                    <table className="table table-hover table-ligth sombra">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição da pista</th>
                                <th scope="col">Data da corrida</th>
                                <th scope="col">Tempo gasto</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                Object.keys(dadosHistorico).map(i => {

                                    return <tr key={i}>
                                        <td> {getPiloto(dadosHistorico[i].CompetidorId)} </td>
                                        <td> {getDescPista(dadosHistorico[i].PistaCorridaId)} </td>
                                        <td> {dadosHistorico[i].DataCorrida} </td>
                                        <td> {dadosHistorico[i].TempoGasto} </td>


                                        <td>
                                            <a className="btn btn-primary" onClick={() => { setIdHistorico([i]) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                        </td>

                                    </tr>


                                })
                            }


                            <tr>
                                <th> </th>
                                <th> </th>
                                <th>Média de tempo:</th>
                                <th> {media()} </th>
                                <th> </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <table className="table table-hover table-ligth sombra">
                        <thead className="thead-dark">

                            <tr>
                                <th scope="col">Pistas usadas</th>
                                <th scope="col">Descrição</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                getPistasUtilizadas().map((dadosPista, i) => (
                                    <tr key={i}>
                                        <td>Pista {dadosPista.id}</td>
                                        <td> {dadosPista.descricao} </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row" id="divTabela">
                <div className="col-md-4 offset-md-4">
                    <table className="table table-hover table-ligth sombra">
                        <thead className="thead-dark">

                            <tr>
                                <th scope="col">Pilotos que não competiram</th>
                                <th scope="col">Nome</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                getPilotoNaoParticipou().map((dadosPilotos, i) => (
                                    <tr key={i}>
                                        <td>Piloto {dadosPilotos.id}</td>
                                        <td> {dadosPilotos.nome} </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CadastroHistorico 