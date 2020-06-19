import React, {Fragment,useState } from 'react'
import {revisarPresupuesto} from '../helpers'  //color para las alerts dependiendo el % restante 
import PropTypes from 'prop-types'
import Modal from "react-bootstrap/Modal"; //https://www.pluralsight.com/guides/working-with-bootstraps-modals-react
import "bootstrap/dist/css/bootstrap.min.css";

const ControlPresupuesto = ({presupuesto , restante ,guardarPresupuesto,guardarGastos}) => {        

    //────component modal  ──────────────────────────────────────────────────────────────────────────────────
    const [isOpen, setIsOpen] = useState(false);
    const showModal = () => {
        setIsOpen(true);
    };
    const hideModal = () => {  
        setIsOpen(false);
    };
    const borrarLs = () =>{
        // Borramos primero de LS
        localStorage.setItem('presupuesto',JSON.stringify([])) //(Key,Valor) //SET (lo agrega a la cola)
        localStorage.setItem('restante',JSON.stringify([])) 
        localStorage.setItem('gastos',JSON.stringify([]))
        // Despues borramos el valor del state para que el useEffect escuche cambios y nos pida nuevamnte el presupuesto inicial
        guardarPresupuesto([])
        guardarGastos([])
    }   
    

    return(         
            <Fragment>
                {/*Alerts presupuesto y restante  */}
                <div className="col btn-group mt-lg-4 flex-column flex-md-row">{/* //! Agregar un flex-colums flex-md-row para corregir el colapsadod de margenes ya que las fuentes al no disminuir lo causan  */}

                    <div className="alert alert-primary">Presupuesto: ${presupuesto} </div>
                    <div className={revisarPresupuesto(presupuesto , restante)}>
                        Restante:$ {restante}  
                    </div>
                    <button type="button" 
                                class="btn  btn-secondary h-auto"  
                                data-toggle="modal" 
                                data-target="confirm"
                                onClick={showModal} 
                                >Reasignar
                        </button> 
                </div>
                {/* Modal de confirmacion */}
                <Modal  show={isOpen} onHide={hideModal}>
                    <Modal.Header>
                    <Modal.Title>ATENCIÓN</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Al cambiar el presupuesto se borraran tambien tu listado de gastos</Modal.Body>
                    <Modal.Footer>
                    <button type="button" class="btn btn-primary" onClick={hideModal}>CANCELAR</button>
                    <button type="button" class="btn btn-danger" onClick={borrarLs} >ACEPTAR</button>
                    </Modal.Footer>   
                </Modal> 
            </Fragment>
         );
}

ControlPresupuesto.prototype = {
    presupuesto: PropTypes.number.isRequired,
    guardarPresupuesto:  PropTypes.func.isRequired,
    restante: PropTypes.number.isRequired
}

export default ControlPresupuesto;

