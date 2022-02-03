import React, { useState, useEffect } from "react"
import FormPista from "./FormPista"

const CadastroPista = () => {

    let [idPista, setIdPista] = useState('')
    const [dadosPista, setDadosPista] = useState({});

    useEffect(() => {
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

    }, [])



    // useEffect(() => {
    //     app.child('pilotos').on('value', dbPhoto => {
    //         console.log(dbPhoto)
    //         if (dbPhoto.val() != null) {
    //             setDadosPista({
    //                 ...dbPhoto.val()
    //             })
    //         } else {
    //             setDadosPista({})
    //         }
    //     })
    // }, [])

    const addEdit = obj => {

        if (idPista == '') {

            fetch("http://localhost:3008/pista", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: new Headers({ 'content-type': 'application/json' })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
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
            console.log(obj)
            fetch("http://localhost:3008/pista/" + dadosPista[idPista].id, {
                method: "PUT",
                headers:  new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                    },
                    (error) => {
                        console.log(error)
                    });




            // app.child(`pilotos/${idPista}`).set(
            //     obj,
            //     err => {
            //         if (err) {
            //             console.log(err)
            //         }
            //     }
            // )
        }
    }

    const deletePista = key => {
        if (window.confirm('Deseja realmente deletar essa pista?')) {
            fetch("http://localhost:3008/pista/" + dadosPista[key].id, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                    },
                    (error) => {
                        console.log(error)
                    });
        }
    }

    return (
        <div>

            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Cadastro de Pistas</h1>
                    <p className="lead">Esse é um projeto teste, conhecendo o React com crud no Firebase</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <FormPista {...({ addEdit, idPista, dadosPista })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-hover table-ligth">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                Object.keys(dadosPista).map(i => {
                                    return <tr key={i}>
                                        <td> {dadosPista[i].id} </td>
                                        <td> {dadosPista[i].nome} </td>
                                        <td> {dadosPista[i].descricao} </td>

                                        <td>
                                            <a className="btn btn-primary" onClick={ () => {setIdPista([i])} }>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn btn-danger" onClick={ () => deletePista(i) }>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
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

export default CadastroPista 