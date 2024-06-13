// AppointmentsChart.js
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const AppointmentsChart = () => {
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    // Cargar los datos del archivo HTML
    fetch('/reporte_citas.html')
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
          // Crear las series para el gráfico
          const series = [
            {
              name: 'Citas Atendidas',
              data: data.citas_atendidas
            },
            {
              name: 'Citas Canceladas',
              data: data.citas_canceladas
            }
          ];

          setChartData({
            series: series,
            options: {
              chart: { type: "line" },
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
        <CardTitle tag="h5">Citas Atendidas y Canceladas por Día</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Comparación de Citas
        </CardSubtitle>
        <Chart
          type="line"
          width="100%"
          height="390"
          options={chartData.options}
          series={chartData.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default AppointmentsChart;
