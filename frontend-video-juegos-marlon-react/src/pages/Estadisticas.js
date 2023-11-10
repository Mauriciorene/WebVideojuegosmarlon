import React, { useEffect, useState } from 'react'; // Importación de React, useEffect y useState desde 'react'
import Header from '../components/Header'; // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import jsPDF from 'jspdf';  // Importación de jsPDF para la generación de documentos PDF
import Chart from 'chart.js/auto';  // Importación de Chart.js para gráficos
import '../styles/App.css'; // Importación de estilos CSS desde '../styles/App.css'

function Estadisticas({Rol}) { // Declaración del componente Estadisticas con el argumento 'rol' 

  const [productos, setProductos] = useState([]);  // Declaración del estado 'productos' y su función 'setProductos' a través de useState, con un valor inicial de un array vacío
  const [myChart, setMyChart] = useState(null);  // Declaración del estado 'myChart' y su función 'setMyChart' a través de useState, con un valor inicial de 'null'

  useEffect(() => {
    fetch('http://localhost:5000/crud/readproducto')  // Realiza una solicitud GET al servidor para obtener productos
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((data) => setProductos(data))  // Almacena los productos en el estado 'productos'
      .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
  }, []);  // Se ejecuta esta función solo una vez al cargar el componente

  useEffect(() => {
    if (productos.length > 0) {  // Si hay productos disponibles
      const ctx = document.getElementById('myChart');  // Obtiene el elemento canvas con el ID 'myChart'

      if (myChart !== null) {
        myChart.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
      }

      const nombresProductos = productos.map((producto) => producto.nombreProducto);  // Extrae los nombres de los productos
      const stokcs = productos.map((producto) => producto.Stock);  // Extrae las cantidades de los productos

      const almacen = new Chart(ctx, {  // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
        type: 'bar',
        data: {
          labels: nombresProductos,  // Asigna los nombres de productos como etiquetas para el eje X
          datasets: [{
            label: 'Cantidad disponible',  // Etiqueta para la leyenda del gráfico
            data: stokcs,  // Asigna las cantidades de productos para la visualización
            backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Define el color de fondo de las barras
            borderColor: 'rgba(54, 162, 235, 1)',  // Define el color del borde de las barras
            borderWidth: 1  // Define el ancho del borde de las barras
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true  // Comienza el eje Y desde cero
            }
          }
        }
      });
      setMyChart(almacen); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
    }
  }, [productos]);  // Se ejecuta cada vez que hay cambios en 'productos'

  const generarReporteAlmacen = () => {
    fetch('http://localhost:5000/crud/readproducto')  // Realiza una solicitud GET al servidor para obtener productos
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((productos) => {
        const doc = new jsPDF();  // Crea un nuevo documento PDF con jsPDF
        let y = 20; // Posición inicial en el eje Y dentro del documento PDF

        doc.setTextColor(76, 176, 20);
        doc.text("Reporte de Estado de Almacén", 20, 10);  // Agrega un título al documento PDF
        doc.setTextColor(0, 0, 0);

        productos.forEach((producto) => {  // Itera sobre los productos para generar el reporte
          doc.text(`Nombre: ${producto.nombreProducto}`, 20, y);  // Agrega el nombre del producto al documento PDF
          doc.text(`Cantidad: ${producto.Stock}`, 20, y + 10);  // Agrega la cantidad del producto al documento PDF

          y += 30; // Incrementa la posición Y para el siguiente producto
          if (y >= 280) {  // Si alcanza el final de la página, crea una nueva página
            doc.addPage();
            y = 15; // Reinicia la posición Y en la nueva página
          }
        });

        doc.save("reporte_almacen.pdf");  // Descarga el documento PDF con el nombre 'reporte_almacen.pdf'
      })
      .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
  };

  return(
    <div>
      <Header Rol={ Rol } />

      <Container className="margen-contenedor">

      <Row className="g-3">

        <Col sm="6" md="6" lg="4">
          <Card>
            <Card.Body>
              <Card.Title>Estado del almacén</Card.Title>
              <canvas id="myChart"  height="300"></canvas>
            </Card.Body>

            <Card.Body>
              <Button onClick={generarReporteAlmacen}>
                Generar reporte
              </Button>
            </Card.Body>

          </Card>
        </Col>

        </Row>
      </Container>


    </div>
  );
}

export default Estadisticas; // Exporta el componente Estadisticas para su uso en otras partes de la aplicación