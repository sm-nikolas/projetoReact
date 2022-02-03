import React, { useEffect, useState } from "react"

const FormPista = (props) => {

    // variaveis de capitura de dados

    const camposIniciais = {
        descricao: '',
        nome: ''
    }

    let [values, setValues] = useState(camposIniciais)

    useEffect(() => {
        if (props.idPista == '') {
            setValues({
                ...camposIniciais
            })
        } else {
            setValues({
                ...props.dadosPista[props.idPista]
            })
        }
    }, [props.idPista, props.dadosPista])

    const manipuladorInputChange = e => {
        let { name, value } = e.target

        setValues({ ...values, [name]: value })
    }



    const manipuladorFormEnvio = e => {
        e.preventDefault(false)
        props.addEdit(values)
    }






    return (
        <form autoComplete="off" onSubmit={manipuladorFormEnvio}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i class="fas fa-file-signature"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Nome" name="nome" value={values.nome}
                    onChange={manipuladorInputChange} />
            </div>

            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i class="fas fa-info-circle"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Descrição" name="descricao" value={values.descricao}
                    onChange={manipuladorInputChange} />
            </div>


            <div className="form-group">
                <input type="hidden" value={values.id} name="id" />
                <input type="submit" value={props.idPista == '' ? 'Salvar' : 'Atualizar'} className="btn btn-primary btn-block" />
            </div>
        </form>
    )
}

export default FormPista 