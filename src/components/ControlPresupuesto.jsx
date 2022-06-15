import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export const ControlPresupuesto = ({ gastos,setGastos,presupuesto,setPresupuesto,setIsValidPresupuesto }) => {
    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
        if(resultado) {
            setGastos([])
            setPresupuesto([])
            setIsValidPresupuesto(false)
        }
    }

    useEffect(() => {
        // Reduce acumulara una gran cantidad de datos en una sola variable
        const totalGastado=gastos.reduce((total, gasto) => gasto.cantidad+total, 0)
        const totalDisponible = presupuesto-totalGastado
        
        // Calcular porcentaje gastado - regla de 3 sin periodicos
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed()

        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000)
    },[gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        })
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 0 ? '#DC2626': '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 0 ? '#DC2626': '#3b82f6',
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo': ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}
