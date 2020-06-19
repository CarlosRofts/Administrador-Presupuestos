export const revisarPresupuesto = (presupuesto , restante ) => {
    let clase;

        // xxxx presupuesto/4 o 2 nos dice que llevamos el 75% o el 50%
    if(presupuesto /4 > restante){ // 25% restante, gastamos ya el 75% del presupuesto
        clase = 'alert alert-danger'
    } else if(presupuesto /2 > restante){ //gastamos ya el 50%
        clase = 'alert alert-warning'
    } else { //estamos por encima del 75%
        clase = 'alert alert-success'
    }

    return clase;
}

