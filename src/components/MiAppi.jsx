import { useState, useEffect } from "react";

function MiAppi() {
  // 3.
  // Estado de los Datos.  
  // Callback se llama en el montaje
    const [datos, setDatos] = useState([]); // Array Vacio // Callback se llama en el montaje / datos guardará los valores traídos desde la API.

  // Estado de la Busqueda. 
    const [busqueda, setBusqueda] = useState('');    
    
  // 2. LLamamos la función que consume la API al momento de montar el componente
    useEffect(() => {
     // console.log("Consulta");
      consultarInformacion();
    }, []);
  
    // 7. Captura en el Dom del componente item.
    const Datos = ({item}) => <p className="card">{item.content}/ {item.title}</p>      // Captura de map (item) imprime(item.content) //Por cada item que recorra el map imprime un parrafo con el contenido del item. // Imprime el item.content
   

    // 1. Función que consulta la API
    const consultarInformacion = async () => {
      const url = 'https://www.feriadosapp.com/api/laws.json';      
      const res = await fetch(url);
      const {data} = await res.json(); // Formatea a json
          // Lo que contiene el endpoint esta dentro de data
      const feriados = data.map((f) => {
        // Dentro de feriados mapee data y traiga el id y el contenido
        // Retorne un objeto
        // Retorno los datos de id y content
        return {   
          id: f.id, content: f.content, title: f.title,   link: f.link,
        };
      });
    
          //6.Actualizamos el estado      
      setDatos(feriados);    
       //   Actualizamos el estado (Hook)   // Solicito a setDatos que capture todo lo que esta dentro de la API y lo guarde en datos
           
    }
    //    4. Input de busqueda de Leyes de los feriados
    return (
      <div className="d-flex flex-column">
        <div className="d-flex">              
        <input 
          name="busqueda" 
          id="busqueda"
          value={busqueda} 
          placeholder="Busqueda de Leyes de los feriados de Chile"
          onChange={(e) => {
          setBusqueda(e.target.value);
          } }
          className="busqueda"/>                         
          </div>         
          
        <div className="grid-container">{	                    //5. filtro y map 
        // eslint-disable-next-line
        datos.filter((e) => {          
            if(busqueda === ' '){                           //Si el input esta vacio retorna e= datos de endpoint (API) capturados en dato.
              return e;
            } else if (                                   //Si no esta vacio, imprime el contenido
              e.content
              .toLocaleLowerCase()                      // En minuscula
              .includes(busqueda.toLocaleLowerCase()) //Que incluya el contenido del input busqueda
              )  {
              return e;
              }                                    // Cuando realice conexion, lo mapee
            }).map((item) => (                    // Al resultado del filter mapealo e imprimelo en el Dom. //Al conectar puntomap c/filter somete al punto map // Renderizado.
            <Datos key={item.id} item={item} />  //Componente de impresion.
          ))}
      </div>    
      </div>
    );
  }
  export default MiAppi;
