import React, { useEffect, useState } from "react"

const FormularioCad = (props) => {

    // variaveis de capitura de dados

    const camposIniciais = {
        nome: '',
        genero: '',
        temperaturaMediaCorpo: '',
        peso: '',
        altura: '',
        id: 0
    }

    let [values, setValues] = useState(camposIniciais)

    useEffect(() => {
        if (props.idAtual == '') {
            setValues({
                ...camposIniciais
            })
        } else {
            setValues({
                ...props.dadosPilotos[props.idAtual]
            })
        }
    }, [props.idAtual, props.dadosPilotos])

    const manipuladorInputChange = e => {
        let { name, value } = e.target

        setValues({ ...values, [name]: value })
    }



    const manipuladorFormEnvio = e => {
        e.preventDefault()
        props.addEdit(values)
    }


    
    return (
        <form autoComplete="off" onSubmit={manipuladorFormEnvio}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className=" fas fa-user"></i>
                    </div>
                </div>

                <input className="form-control" placeholder="Nome" name="nome" value={values.nome}
                    onChange={manipuladorInputChange} />
            </div>

            <div className="row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-venus-mars"></i>
                        </div>
                    </div>

                    <select className="custom-select" id="inputGroupSelect01" name="genero" value={values.genero}
                        onChange={manipuladorInputChange}>
                        <option>Gênero...</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-thermometer-half"></i>
                        </div>
                    </div>

                    <input className="form-control" placeholder="Temperatura corporal" name="temperaturaMediaCorpo"
                        value={values.temperaturaMediaCorpo} onChange={manipuladorInputChange} />
                </div>
            </div>
            <div className="row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-id-badge"></i>
                        </div>
                    </div>

                    <input type="number" min="0" step="any" className="form-control" placeholder="Altura" name="altura"
                        value={values.altura} onChange={manipuladorInputChange} />
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-id-badge"></i>
                        </div>
                    </div>

                    <input type="number" min="0" step="any" className="form-control" placeholder="Peso" name="peso"
                        value={values.peso} onChange={manipuladorInputChange} />
                </div>
            </div>

            <div className="form-group">
                <input type="hidden" value={values.id} name="id"/>
                <input type="submit" value={props.idAtual == '' ? 'Salvar' : 'Atualizar'} className="btn btn-primary btn-block" />
            </div>
        </form>
    )
}

export default FormularioCad 