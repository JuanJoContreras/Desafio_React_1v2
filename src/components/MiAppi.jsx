import { useState, useEffect } from "react";

function MiAppi() {
    const [datos, setDatos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    
    
  // 2. LLamamos al función que consume la API al momento de montar el componente
    useEffect(() => {
      consultarInformacion();
    
    }, []);
  
    const Datos = ({item}) => <p className="card">{item.content}</p>  

    // 1. Función que consulta la API
    const consultarInformacion = async () => {
      const url = 'https://www.feriadosapp.com/api/laws.json';      
      const res = await fetch(url);
      const {data} = await res.json();

      const feriados = data.map((feriado) => {
        return {
          id: feriado.id,
          content: feriado.content,
        };
      });
      setDatos(feriados);      
            
    }
    
    return (
      <div className="d-flex flex-column">
          <div className="d-flex">              
            <input 
          name="busqueda" 
          id="busqueda"
          value={busqueda} 
          placeholder="Ingresa Datos"
          onChange={(e) => {
          setBusqueda(e.target.value);} }
          className="filtro"/>                         
          </div>
        
        <div className="grid-container">
        {	datos.filter((e) => {
            if(busqueda === ''){
              return e;
            } else 
            if (
              e.content.toLocaleLowerCase()
	      .includes(busqueda.toLocaleLowerCase()))
              {
              return e;
              }
            })
          .map((item) => (
            <Datos key={item.id} 
             item={item} />
          ))}
      </div>    
      </div>
    );
  }
  export default MiAppi;
