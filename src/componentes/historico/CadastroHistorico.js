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



    // useEffect(() => {
    //     app.child('pilotos').on('value', dbPhoto => {
    //         console.log(dbPhoto)
    //         if (dbPhoto.val() != null) {
    //             setHistorico({
    //                 ...dbPhoto.val()
    //             })
    //         } else {
    //             setHistorico({})
    //         }
    //     })
    // }, [])


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



            // app.child('pilotos').push(
            //     obj,
            //     error => {
            //         if (error) {
            //             console.log(error)
            //         }
            //     }
            // )
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




            // app.child(`pilotos/${idHistorico}`).set(
            //     obj,
            //     err => {
            //         if (err) {
            //             console.log(err)
            //         }
            //     }
            // )
        }
    }

    function media() {

        let soma = 0;

        dadosHistorico.forEach(element => {

            soma += parseFloat(element.TempoGasto)
        });
        return soma / dadosHistorico.length
    }

    const getDescPista = key => {
        let pista = dadosPista.find(p => p.id == key)
        return pista?.descricao

    }

    const getPista = key => {
        let pista = dadosPista.find(p => p.id == key)
        return pista?.id

    }

    const getPiloto = key => {
        let piloto = dadosPilotos.find(p => p.id == key)
        return piloto?.nome

    }




    return (
        <div>

            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Cadastro de historicoCorridas</h1>
                    <p className="lead">Esse é um projeto teste, conhecendo o React com crud no Firebase</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <FormHistorico {...({ addEdit, idHistorico, dadosHistorico })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-hover table-ligth">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
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
                                        <td> {dadosHistorico[i].id} </td>
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
                                <th> </th>
                                <th>Média de tempo:</th>
                                <th> {media()} </th>
                                <th> </th>
                            </tr>
                        </tbody>
                    </table>


                    <table className="table table-hover table-ligth">
                        <thead className="thead-dark">

                            <tr>
                                <th scope="col">Pistas usadas</th>
                                <th scope="col">Descrição</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                Object.keys(dadosHistorico).map(i => {
                                    return <tr key={i}>
                                        <td>Pista {getPista(dadosHistorico[i].PistaCorridaId)}</td>
                                        <td> {getDescPista(dadosHistorico[i].PistaCorridaId)} </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default CadastroHistorico 