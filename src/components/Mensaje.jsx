
export const Mensaje = ({children, tipo}) => {
  return (
    // creando una clase fija con una clase dinamica
    <div className={`alerta ${tipo}`}>  
        {children}
    </div>
  )
}
