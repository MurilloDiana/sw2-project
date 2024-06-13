import pandas as pd

# Cargar los archivos CSV
pets_df = pd.read_csv('petsP.csv', encoding='latin1')
atencion_df = pd.read_csv('atencionP.csv', encoding='latin1')

# Convertir la columna de fecha a tipo datetime en atencion_df
atencion_df['fecha'] = pd.to_datetime(atencion_df['fecha'])

# Filtrar las atenciones completadas y canceladas
atenciones_completadas = atencion_df[atencion_df['asistencia'] == 'completado']
atenciones_canceladas = atencion_df[atencion_df['asistencia'] == 'cancelado']

# Promedio de atenciones con cita y sin cita por mes
atenciones_con_cita = atenciones_completadas[atenciones_completadas['reserva'] == True]
atenciones_sin_cita = atenciones_completadas[atenciones_completadas['reserva'] == False]

promedio_atenciones_con_cita = atenciones_con_cita.groupby(atenciones_con_cita['fecha'].dt.to_period('M')).size().mean()
promedio_atenciones_sin_cita = atenciones_sin_cita.groupby(atenciones_sin_cita['fecha'].dt.to_period('M')).size().mean()

# Promedio de mascotas atendidas por mes
merged_df = atencion_df.merge(pets_df, left_on='pet_id', right_on='id')
atenciones_por_mes_species = merged_df.groupby(merged_df['fecha'].dt.to_period('M')).size()
promedio_mascotas_atendidas_por_mes = atenciones_por_mes_species.mean()

# Promedio de citas canceladas por mes
citas_canceladas_por_mes = atenciones_canceladas.groupby(atenciones_canceladas['fecha'].dt.to_period('M')).size()
promedio_citas_canceladas_por_mes = citas_canceladas_por_mes.mean()

# Promedio de citas atendidas por mes
citas_atendidas_por_mes = atenciones_completadas.groupby(atenciones_completadas['fecha'].dt.to_period('M')).size()
promedio_citas_atendidas_por_mes = citas_atendidas_por_mes.mean()

# Crear el HTML
html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <title>Promedios de Atenciones</title>
</head>
<body>
    <script>
        const promediosData = {{
            "promedio_atenciones_con_cita": {promedio_atenciones_con_cita:.2f},
            "promedio_atenciones_sin_cita": {promedio_atenciones_sin_cita:.2f},
            "promedio_mascotas_atendidas_por_mes": {promedio_mascotas_atendidas_por_mes:.2f},
            "promedio_citas_canceladas_por_mes": {promedio_citas_canceladas_por_mes:.2f},
            "promedio_citas_atendidas_por_mes": {promedio_citas_atendidas_por_mes:.2f}
        }};
    </script>
</body>
</html>
"""

# Guardar el HTML en un archivo
with open('promedios_atenciones.html', 'w') as file:
    file.write(html_content)
