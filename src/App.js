import React , {Fragment,useState,useEffect} from 'react';
import Pregunta from './components/Pregunta'
import Formulario from './components/Formulario'
import Listado from  './components/Listado'
import ControlPresupuesto from './components/ControlPresupuesto'
import SocialLinks from './components/SocialLinks'
import  './scss/styles.scss'

function App() {   

  // Obteniendo data del Local Storage para el stage
  let gastosLs = JSON.parse(localStorage.getItem('gastos')) //-key del LS //convirtiendo de array a string con JSON.parse
  if(!gastosLs){
    gastosLs = []
  }
  let presupuestoLs = JSON.parse(localStorage.getItem('presupuesto')) //-key del LS //convirtiendo de array a string con JSON.parse
  if(!presupuestoLs){
    presupuestoLs = []
  }
  let restanteLs = JSON.parse(localStorage.getItem('restante')) //-key del LS //convirtiendo de array a string con JSON.parse
  if(!restanteLs){
    restanteLs = []
  }

  // State
  const [presupuesto, guardarPresupuesto] = useState(presupuestoLs)
  const [restante, guardarRestante] =  useState(restanteLs)
  const [mostrarPregunta, actualizarPregunta] = useState(true) //form principal, por default es visible | conditional component
  const [gastos,guardarGastos] = useState(gastosLs) //'recibe/guarda map de gastos  mas el nuevo gasto agregado / inicia con lo que tengamo en LS
  const [gasto,guardarGasto] = useState([]) //recibe/guarda solo el nuevo gasto agregado
  const [crearGasto,guardarCrearGasto] = useState(false) //ayuda a validar 


  // Actualizar el presupuesto  restante |
  useEffect( () => {
      // Agrega el nuevo presupuesto
    if(crearGasto){
      guardarGastos([
        ...gastos,
        gasto //copiamos los que ya estaban y agregamos el nuevo
      ]) 
      // resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad 
      guardarRestante(presupuestoRestante)
      guardarCrearGasto(false) //reset | hasta que pase a true volvera a almacenar.
    }

    // Set al Local Storage
    //siempre guardara , si viene vacio se valida arriba
      localStorage.setItem('gastos',JSON.stringify(gastos)) //(Key,Valor) //SET (lo agrega a la cola)
      localStorage.setItem('presupuesto',JSON.stringify(presupuesto)) //(Key,Valor) //SET (lo agrega a la cola)
      localStorage.setItem('restante',JSON.stringify(restante)) //(Key,Valor) //SET (lo agrega a la cola)

      //pedir presupuesto si este no existe en LS
      if(presupuesto > 1){  
      actualizarPregunta(false)
      // console.log("if")
    } else{ 
      //° si no hay datos en LS pedimos presupuesto
      actualizarPregunta(true)
      // console.log("else")
    }
  }, [gasto,crearGasto,gastos,restante,presupuesto,gastosLs])

  const eliminarGasto = (id) =>{
    // console.log("delete it", gastoid)
    // rehacer el array sin el elemento a borrar
    const nuevosGastos = gastos.filter(gasto => gasto.id !== id)
    guardarGastos(nuevosGastos)
  } 

  return (
    <Fragment>
      <SocialLinks/>
      <div className="header w-100 py-3 mb-5">
          <h1>Admistrador de Gastos</h1>   
      </div>

      <div className="container d-flex justify-content-center">
        <div className="contenido-principal px-5 my-auto">
          { mostrarPregunta  //para permitir volver a declarar el presupuesto, habria que utilizar este state 
            ? 
              ( //el parentesis da por implicito un return 
                <Pregunta
                  guardarPresupuesto={guardarPresupuesto}
                  guardarRestante={guardarRestante}
                  actualizarPregunta={actualizarPregunta}
                />
              ) 
              : 
              (
                <div className="row align-content-center">
                  <div className="col px-4">
                      <Formulario  
                        guardarGasto = {guardarGasto}
                        guardarCrearGasto = {guardarCrearGasto}
                      />
                  </div>
                  <div className="col px-md-4">
                      <h2>Listado</h2>
                      <ControlPresupuesto
                        presupuesto={presupuesto}
                        restante={restante}
                        guardarPresupuesto={guardarPresupuesto}
                        guardarGastos={guardarGastos}
                      />
                      <Listado
                        gastos={gastos}
                        eliminarGasto={eliminarGasto}
                      />
                      
                  </div>
                </div> 
              )
          }
          
        </div>
      </div>
    </Fragment>
  );
}
export default App;
