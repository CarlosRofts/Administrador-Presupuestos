import React,{Fragment,useState} from 'react'
import Error from './Error'
import PropTypes from 'prop-types'

const Pregunta = ({guardarPresupuesto , guardarRestante , actualizarPregunta}) => {

    // State | variable-get , funcion-set
    const [cantidad, guardarCantidad] = useState(0)
    const [error , guardarError] = useState(false)

    //Lee el presupuesto
    const definirPresupuesto = e => {
        // console.log(parseFloat(e.target.value))
        guardarCantidad(parseFloat(e.target.value , 10 ) ) //Set al state | base10
    }

    // Definir presupuesto
    const agregarPresupuesto = e => {
         e.preventDefault();
        //  validaciones
        if(cantidad < 1 || isNaN(cantidad)) { //hay error
            guardarError(true)
            return //no necesitamos un else ya que este return detiene la función.
            
        } 
        guardarError(false)
        guardarPresupuesto(cantidad) //state app.js
        guardarRestante(cantidad) //state app.js
        actualizarPregunta(false) //ocultamos el form principal.
    }

	return (  
		<Fragment>
			<h2 className="subtitle">Coloca tu presupuesto</h2>

            {error ? <Error
                        mensaje="El Presupuesto es incorrecto, solo se admiten numeros y los campos tienen que estar llenar para continuar"
                        guardarError={guardarError}
                     /> : null}

			<form 
                onSubmit={agregarPresupuesto}
            >
				<div className="form-group row justify-content-center">
					<label className="mr-2 p-2 ">Presupuesto</label>
					<input 
						type="number" 
						className="form-control w-75" 
						aria-describedby="number" 
						placeholder="Tu presupuesto"

                        onChange={definirPresupuesto}
                        />
				</div>

                <div className="row justify-content-center ">
                    <button 
                        type="submit" 
                        className="btn btn-primary my-3 w-50"
                        >Submit</button>
                </div>
			</form>
		</Fragment>
	);
}

Pregunta.propTypes = {
    guardarPresupuesto:  PropTypes.func.isRequired,
    guardarRestante:  PropTypes.func.isRequired,
    actualizarPregunta:  PropTypes.func.isRequired
}


export default Pregunta;
