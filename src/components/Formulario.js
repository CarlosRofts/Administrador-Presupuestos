import React , {useState}from 'react'
import Error from './Error'
import shortid from 'shortid' //npm i shortid
import PropTypes from 'prop-types'

const Formulario = ({guardarGasto , guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('') //tambien podría iniciar como un objeto: {nombre="" y cantidad=""}
    const[cantidad,guardarCantidad] = useState(0)
    const [error , guardarError] = useState(false) //conditional component

    // Agregar gastos
    const agregarGasto= e => {
        e.preventDefault()
        // validar 
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            guardarError(true) //conditional component
            return
        }
        // construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        // pasar el gasto al componente principal
        guardarGasto(gasto)
        guardarCrearGasto(true) //cuando es true le permitimos guardar
        // resetear el form
        guardarNombre('')
        guardarCantidad(0)
    }

    return (
        <form
            onSubmit={agregarGasto}
        >
                {error 
                ?   
                    <Error 
                        mensaje="Ambos campos son obligatorios o Presupuesto incorrecto" 
                        guardarError={guardarError}
                    /> 
                : 
                    null}


            <h2>Agrega tus gastos</h2>
            <div className="form-group row">
                <label >Nombre del gasto</label>
                <input 
                    type="text"
                    className=" form-control"
                    name="nombre"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)} //set state
                />
            </div>
            
            <div className="form-group row">
                <label >Cantidad Gasto</label>
                <input 
                    type="number"
                    className=" form-control"
                    name="nombre"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value,10))} //set state
                />
            </div>

            <div className="form-group row mx-5">
                <input 
                        type="submit"
                        className=" btn btn-primary mb-2 col "
                        value="Agregar Gasto"
                />
            </div>

        </form>
      );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;
