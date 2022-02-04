import React, { useState, useEffect } from "react"
import FormPiloto from "./FormPiloto"
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

    function refreshPage() {
        window.location.reload();
    }

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
                        refreshPage()
                    },
                    (error) => {
                        console.log(error)
                    }
                )

        } else {
            console.log(obj)
            fetch("http://localhost:3008/competidores/" + dadosPilotos[idAtual].id, {
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

    const deletePiloto = key => {
        if (window.confirm('Deseja realmente deletar esse piloto?')) {
            fetch("http://localhost:3008/competidores/" + dadosPilotos[key].id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
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

    return (
        <div>

            <div className="jumbotron jumbotron sombra2" id="apresenta">
                <div className="container fonteTitulo">
                    <h1 className="display-4">Cadastre-se como piloto</h1>
                </div>
            </div>

            <div className="row" id="container">
                <div className="col-md-4 offset-md-4">
                    <FormPiloto {...({ addEdit, idAtual, dadosPilotos })} />
                </div>
            </div>
            <div className="row container" id="divTabela">
                <div className="col-md-8 offset-2">
                    <table className="table table-hover table-ligth sombra" id="container">
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
                                            <a className="btn btn-primary" onClick={() => { setIdAtual([i]) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn btn-danger" onClick={() => deletePiloto(i)}>
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