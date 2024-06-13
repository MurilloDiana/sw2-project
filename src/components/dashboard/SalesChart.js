// SalesChart.js
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    // Cargar los datos del archivo HTML
    fetch('./reporte.html')
      .then(response => response.text())
      .then(html => {
        // Crear un elemento temporal para extraer el script del HTML
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const scriptContent = doc.querySelector('script').textContent;

        // Ejecutar el script para obtener los datos
        eval(scriptContent);

        // Acceder a los datos desde window.reporteData
        const data = window.reporteData;
        if (data) {
          setChartData({
            series: [
              { name: "Reservas", data: data.reservas },
              { name: "Sin Reserva", data: data.sinReserva }
            ],
            options: {
              chart: { type: "area" },
              xaxis: { categories: data.fechas }
            }
          });
        }
      })
      .catch(error => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Comparación de Atenciones</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Reservas vs Atención sin Cita
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartData.options}
          series={chartData.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
