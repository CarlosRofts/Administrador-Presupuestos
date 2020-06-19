import React from 'react'
import PropTypes from 'prop-types'

const Gasto = ({gasto , eliminarGasto }) => {
    return (         
        <li className="gasto">
            <p>
                {gasto.nombre}
                <span className="gasto">
                    ${gasto.cantidad}
                    <i className="mx-1">
                        <button
                            className="btn eliminar  btn-outline-danger "
                            onClick={ () => eliminarGasto(gasto.id)}
                            >
                                &times;
                        </button>
                    </i>
                </span>                
            </p>
        </li>    
        
     );
}
 
Gasto.propTypes = {
    gasto: PropTypes.object.isRequired
}

export default Gasto;