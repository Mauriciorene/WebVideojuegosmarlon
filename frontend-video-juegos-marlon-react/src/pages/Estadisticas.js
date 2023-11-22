import React, { useEffect, useState } from 'react'; // Importación de React, useEffect y useState desde 'react'
import Header from '../components/Header'; // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import jsPDF from 'jspdf';  // Importación de jsPDF para la generación de documentos PDF
import 'jspdf-autotable'; // Impotar una tabla
import Chart from 'chart.js/auto';  // Importación de Chart.js para gráficos
import '../styles/App.css'; // Importación de estilos CSS desde '../styles/App.css'
import Footer from '../components/Footer';
// Importa la biblioteca html2canvas, que proporciona funciones para capturar y convertir el contenido HTML, incluidos elementos del DOM, en imágenes de lienzo (canvas).
import html2canvas from 'html2canvas';

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
    if (productos.length > 0) { // Si hay productos disponibles
      const ctx = document.getElementById('myChart'); // Obtiene el elemento canvas con el ID 'myChart'
  
      if (myChart !== null) {
        myChart.destroy();  // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
      }
  
      const nombresProductos = productos.map((producto) => producto.nombreProducto); // Extrae los nombres de los productos
      const stokcs = productos.map((producto) => producto.Stock); // Extrae las cantidades de los productos
  
      const dynamicColors = stokcs.map(() => {
        // Genera colores dinámicamente para cada barra
        const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
        return randomColor;
      });
  
      const almacen = new Chart(ctx, { // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
        type: 'bar',
        data: {
          labels: nombresProductos,   // Asigna los nombres de productos como etiquetas para el eje X
          datasets: [{
            label: 'Cantidad disponible',   // Etiqueta para la leyenda del gráfico
            data: stokcs,  // Asigna las cantidades de productos para la visualización
            backgroundColor: dynamicColors,   // Define los colores dinamicos de las barras
            borderColor: dynamicColors.map(color => color.replace('0.5', '1')), // Ajusta la opacidad del borde
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
  
      setMyChart(almacen); // Guarda la referencia al nuevo gráfico en el estado
    }
  }, [productos]);  // Se ejecuta cada vez que hay cambios en 'productos'

  const generarReporteAlmacen = () => {
    fetch('http://localhost:5000/crud/readproducto')  // Realiza una solicitud GET al servidor para obtener productos
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((productos) => {
        const doc = new jsPDF();  // Crea un nuevo documento PDF con jsPDF

        doc.setTextColor(128, 0, 128);
        doc.text("Reporte de Estado de Almacén", 20, 15);  // Agrega un título al documento PDF
        doc.setTextColor(0, 0, 0);

        const columns = ["Nombre", "Cantidad"];
        const rows = productos.map((producto) => [producto.nombreProducto, producto.Stock]);
  
        // Configura el color de las líneas antes de la generación de la tabla
        doc.setDrawColor(0); // 0 representa negro

        doc.autoTable({
          head: [columns],
          body: rows,
          startY: 25,
          margin: { top: 15 },
          styles: {
           lineColor: [0, 0, 0], // Establecer el color de las líneas a negro
           lineWidth: 0.5,       // Establecer el ancho de las líneas
          },
        });
  
        doc.save("reporte_almacen.pdf");
      })
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  // Definición de la función generarReporteAlmacenImg como una función asíncrona
const generarReporteAlmacenImg = async () => {
  try {
    // Utiliza html2canvas para capturar el contenido del elemento con el ID 'myChart' y obtener un objeto canvas
    const canvas = await html2canvas(document.getElementById('myChart'));
    // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
    const pdf = new jsPDF();
    // Convierte el objeto canvas a una URL de datos en formato PNG
    const imgData = canvas.toDataURL('image/png');
    // Añade un texto al documento PDF
    pdf.text("Reporte de Estado de Almacén", 67, 10);
    // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
    
    // Calcula las coordenadas para centrar la imagen en la página
    const pageWidth = pdf.internal.pageSize.width;
    const imgWidth = 100; // Ancho deseado de la imagen
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcula la altura proporcional
    const xPos = (pageWidth - imgWidth) / 2; // Calcula la posición X para centrar    
    // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
    pdf.addImage(imgData, xPos, 20, imgWidth, imgHeight);

    // Guarda el documento PDF con un nombre específico
    pdf.save("reporte_almacen_con_grafico.pdf");
  } catch (error) {
    // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
    console.error('Error al generar el reporte con imagen:', error);
  }
};

  return(
    <div>
      <Header Rol={ Rol } />

      <Container className="margen-contenedor text-center">

      <Row className="g-3">

      <Col sm={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Body>
                <Card.Title>Estado del almacén</Card.Title>
              </Card.Body>

              <Card.Body>
                <Button onClick={generarReporteAlmacenImg}>
                  Generar reporte con imagen
                </Button>
              </Card.Body>

              </Card>
          </Col>

        <Col sm={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
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