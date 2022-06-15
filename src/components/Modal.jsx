import { useState, useEffect } from 'react'
import { Mensaje } from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'


export const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEditar).length>0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    },[])

    const handleSubmit = e => {
        e.preventDefault()

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos deben estar llenos');

            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return 
        }
        // arma un nuevo objeto, es mejor que crear una nueva const
        guardarGasto({nombre,cantidad,categoria,fecha,id})
    }

    const ocultarModal = () => {
        setAnimarModal(false)
        // Siempre que edite algun estado lo mejor es limpiar los States
        setGastoEditar({})
        
        setTimeout(() => {
            setModal(false)
        }, 500);
    }
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="Boton Cerrar Modal"
                    onClick={ocultarModal}
                />
            </div>

            <form 
                className={`formulario ${animarModal ? "animar": "cerrar" }`}
                onSubmit={handleSubmit}
            >
                <legend>{gastoEditar.nombre ? "Editar Gasto":"Nuevo Gasto"}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor='nombre'>Nombre Gasto</label>
                    <input 
                        id="nombre" 
                        type="text" 
                        placeholder='Añade un Nombre de Gasto' 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>
                    <input 
                        id="cantidad" 
                        type="number" 
                        placeholder='Añade la cantidad dele gasto: ej. 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    {/* Agregar más categorias independientemente con sus img */}
                    <label htmlFor='categoria'>Categoria Gasto</label>
                    <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value={gastoEditar.nombre ? "Guardar Cambios":"Añadir Gasto"} />
            </form>
        </div>
    )
}
