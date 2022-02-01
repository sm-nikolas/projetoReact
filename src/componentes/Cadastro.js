import React, {useState, useEffect} from "react"
import FormularioCad from "./FormularioCad"
import app from '../database/firebase'

const Cadastro = () => {




    





    let [dadosPilotos, setDadosPilotos] = useState({})

    let [idAtual, setIdAtual] = useState('')

    useEffect( () => {
        app.child('pilotos').on('value', dbPhoto => {
            if(dbPhoto.val() != null) {
                setDadosPilotos({
                    ...dbPhoto.val()
                })
            } else {
                setDadosPilotos({})
            }
        })
    }, [])

    const addEdit = obj => {

        if(idAtual == ''){
            console.debug(obj)


            fetch("http://localhost:3001/competidores", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: new Headers({'content-type': 'application/json'})
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

            

            app.child('pilotos').push(
                obj,
                error => {
                    if(error){
                        console.log(error)
                    }
                } 
            )
        } else {
            app.child(`pilotos/${idAtual}`).set(
                obj,
                err => {
                    if(err) {
                        console.log(err)
                    }
                }
            )
        }
    }

    const deletePiloto = key => {
        if(window.confirm('Deseja realmente deletar esse piloto?')) {
            app.child(`pilotos/${key}`).remove(
                err => {
                    if(err){
                        console.log(err)
                    }
                }
            )
        }
    }

    return(
        <div>

            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Cadastro de Pilotos</h1>
                    <p className="lead">Esse é um projeto teste, conhecendo o React com crud no Firebase</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <FormularioCad { ...( {addEdit, idAtual, dadosPilotos}) }/>
                </div>
                <div className="col-md-7">
                    <table className="table table-hover table-bordered table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Gênero</th>
                            <th scope="col">Média de temperatura corporal</th>
                            <th scope="col">Peso</th>
                            <th scope="col">Altura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(dadosPilotos).map(id => {
                                    return <tr key={id}>
                                            <td> {dadosPilotos[id].nome} </td>
                                            <td> {dadosPilotos[id].genero} </td>
                                            <td> {dadosPilotos[id].temperaturaMediaCorpo} </td>
                                            <td> {dadosPilotos[id].peso} </td>
                                            <td> {dadosPilotos[id].altura} </td>

                                            <td>
                                                <a className="btn btn-primary" onClick={ () => {setIdAtual(id)} }>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </a>
                                                <a className="btn btn-danger" onClick={ () => deletePiloto(id) }>
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

        </div>
    )
}

export default Cadastro 