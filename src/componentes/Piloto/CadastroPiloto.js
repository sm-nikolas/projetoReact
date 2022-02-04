import React, { useState, useEffect } from "react"
import FormularioCad from "./FormularioCad"
import '../../css/style.css';

const CadastroPiloto = () => {

    let [idAtual, setIdAtual] = useState('')
    
    const [dadosPilotos, setDadosPilotos] = useState({});

    useEffect(() => {
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
    //             setDadosPilotos({
    //                 ...dbPhoto.val()
    //             })
    //         } else {
    //             setDadosPilotos({})
    //         }
    //     })
    // }, [])

    const addEdit = obj => {

        if (idAtual == '') {

            fetch("http://localhost:3008/competidores", {
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
            fetch("http://localhost:3008/competidores/" + dadosPilotos[idAtual].id, {
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




            // app.child(`pilotos/${idAtual}`).set(
            //     obj,
            //     err => {
            //         if (err) {
            //             console.log(err)
            //         }
            //     }
            // )
        }
    }

    const deletePiloto = key => {
        if (window.confirm('Deseja realmente deletar esse piloto?')) {
            fetch("http://localhost:3008/competidores/" + dadosPilotos[key].id, {
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
                    <h1 className="display-4">Cadastro de Pilotos</h1>
                    <p className="lead">Esse é um projeto teste, conhecendo o React com crud no Firebase</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <FormularioCad {...({ addEdit, idAtual, dadosPilotos })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-hover table-ligth">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Gênero</th>
                                <th scope="col">Média de temperatura corporal</th>
                                <th scope="col">Peso</th>
                                <th scope="col">Altura</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                Object.keys(dadosPilotos).map(i => {
                                    return <tr key={i}>
                                        <td scope="row"> {dadosPilotos[i].nome} </td>
                                        <td scope="row"> {dadosPilotos[i].genero} </td>
                                        <td scope="row"> {dadosPilotos[i].temperaturaMediaCorpo} </td>
                                        <td scope="row"> {dadosPilotos[i].peso} </td>
                                        <td scope="row"> {dadosPilotos[i].altura} </td>

                                        <td>
                                            <a className="btn btn-primary" onClick={ () => {setIdAtual([i])} }>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn btn-danger" onClick={ () => deletePiloto(i) }>
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

export default CadastroPiloto 