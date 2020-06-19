import React from 'react'
import Gasto from './Gasto'
import PropTypes from 'prop-types'

const Listado = ({gastos,eliminarGasto}) => {
    return (  
        <div className="gastos-realizados">
            {gastos.map( gasto => (
                <Gasto
                key={gasto.id}
                    gasto={gasto}
                    eliminarGasto={eliminarGasto}
                />
            ))}
        </div>
    );
}

Listado.propTypes = {
    gastos: PropTypes.array.isRequired
}


export default Listado;