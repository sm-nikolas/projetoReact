import React, { useEffect, useState } from "react"



const FormHistorico = (props) => {

    const [dadosPilotos, setDadosPilotos] = useState([]);
    const [dadosPista, setDadosPista] = useState([]);


    const camposIniciais = {
        CompetidorId: '',
        PistaCorridaId: '',
        DataCorrida: '',
        TempoGasto: '',
        id: 0
    }

    let [values, setValues] = useState(camposIniciais)

    useEffect(() => {
        if (props.idHistorico == '') {
            setValues({
                ...camposIniciais
            })
        } else {
            setValues({
                ...props.dadosHistorico[props.idHistorico]
            })
        }


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


    }, [props.idHistorico, props.dadosHistorico])

    const manipuladorInputChange = e => {
        let { name, value } = e.target

        setValues({ ...values, [name]: value })
    }



    const manipuladorFormEnvio = e => {
        console.log(e)
        e.preventDefault(false)
        props.addEdit(values)
    }



    return (
        <form id='form' autoComplete="off" onSubmit={manipuladorFormEnvio}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className=" fas fa-user"></i>
                    </div>
                </div>
                <select className="custom-select" id="inputGroupSelect01" name="CompetidorId" onChange={manipuladorInputChange} value={values.CompetidorId}>
                    <option>Selecione o piloto</option>
                    {dadosPilotos.map((option) => (
                        <option key={option.id} value={option.id}>{option.nome}</option>
                    ))}
                </select>
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-road"></i>
                    </div>
                </div>
                <select className="custom-select" id="inputGroupSelect01" name="PistaCorridaId" onChange={manipuladorInputChange} value={values.PistaCorridaId}>
                    <option>Selecione a pista</option>
                    {dadosPista.map((option) => (
                        <option key={option.id} value={option.id}>{option.descricao}</option>
                    ))}
                </select>
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-stopwatch"></i>
                    </div>
                </div>
                <input type="number" min="0" step="any" className="form-control" placeholder="Tempo Gasto" name="TempoGasto"
                    value={values.TempoGasto} onChange={manipuladorInputChange} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                </div>
                <input type="date" className="form-control" placeholder="DataCorrida" name="DataCorrida" value={values.DataCorrida}
                    onChange={manipuladorInputChange} />
            </div>


            <div className="form-group">
                <input type="hidden" value={values.id} name="id" />
                <input type="submit" value={props.idHistorico == '' ? 'Salvar' : 'Atualizar'} className="btn btn-primary btn-block" />
            </div>
        </form>
    )
}

export default FormHistorico 