import React, { useEffect } from 'react';
import Header from '../components/Header';
import '../styles/App.css';

function Home({Rol}) {

  useEffect(() => {
    // Obtén el elemento del cuerpo del documento
    const body = document.body;

    // Crea un nuevo elemento h1
    const welcomeText = document.createElement('h1');
    welcomeText.textContent = '¡Bienvenido!';

    // Aplica estilos al elemento h1 para centrarlo y aumentar el tamaño de fuente
    welcomeText.style.position = 'absolute';
    welcomeText.style.top = '50%';
    welcomeText.style.left = '50%';
    welcomeText.style.transform = 'translate(-50%, -50%)';
    welcomeText.style.color = 'white'; // Color del texto
    welcomeText.style.fontSize = '4em'; // Tamaño de fuente (ajusta según sea necesario)

    // Añade el elemento h1 al cuerpo del documento
    body.appendChild(welcomeText);

    // Limpieza: remueve el elemento h1 cuando el componente se desmonta
    return () => {
      body.removeChild(welcomeText);
    };
  }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente


  return(
    <div>
      <Header Rol={ Rol } />
    </div>
  );
}

export default Home;