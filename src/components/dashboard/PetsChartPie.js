// PetsChart.js
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const PetsChartPie = () => {
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    // Cargar los datos del archivo HTML
    fetch('/reporte_pets.html')
      .then(response => response.text())
      .then(html => {
        // Crear un elemento temporal para extraer el script del HTML
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const scriptContent = doc.querySelector('script').textContent;

        // Ejecutar el script para obtener los datos
        eval(scriptContent);

        // Acceder a los datos desde window.reportePetsData
        const data = window.reportePetsData;
        if (data) {
          setChartData({
            series: data.counts,
            options: {
              chart: { type: 'pie' },
              labels: data.species,
              legend: { position: 'bottom' },
              title: {
                text: '',
                align: 'center'
              }
            }
          });
        }
      })
      .catch(error => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Atenciones por Especie</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
        
        </CardSubtitle>
        <Chart
          type="pie"
          width="100%"
          height="390"
          options={chartData.options}
          series={chartData.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default PetsChartPie;
