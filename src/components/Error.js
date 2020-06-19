import React from 'react'
import PropTypes from 'prop-types'


const Error = ({mensaje,guardarError}) => { 
    return(
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <h4 className="alert-heading text-center"><strong>¡Oh no parece que HAY ERRORES!</strong></h4>
            <p className="text-center"> {mensaje} </p>
           
            <button 
                type="button" className="close" data-dismiss="alert" aria-label="Close"
                onClick = { () => guardarError(false)} //hacemos que al cerrar se resetee el state por si hay otro error se muestre nuevamente.
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}
 
Error.propTypes = {
    mensaje:  PropTypes.string.isRequired,
    guardarError:  PropTypes.func.isRequired,
    
}


export default Error;