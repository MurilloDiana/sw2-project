import pandas as pd
import json
import os

# Cargar el archivo CSV
df = pd.read_csv('atencionP.csv')

# Convertir la columna de fecha a tipo datetime
df['fecha'] = pd.to_datetime(df['fecha'])

# Filtrar las atenciones completadas
df_completado = df[df['asistencia'] == 'completado']

# Contar las reservas y atenciones sin cita por día
reservas_por_dia = df_completado[df_completado['reserva'] == True].groupby(df_completado['fecha'].dt.date).size()
sin_reserva_por_dia = df_completado[df_completado['reserva'] == False].groupby(df_completado['fecha'].dt.date).size()

# Crear un DataFrame con las dos series
df_resumen = pd.DataFrame({
    'Reservas': reservas_por_dia,
    'Sin Reserva': sin_reserva_por_dia
}).fillna(0)

# Asegurarse de que el índice del DataFrame es de tipo datetime
df_resumen.index = pd.to_datetime(df_resumen.index)

# Convertir los datos a un diccionario para JSON
data = {
    'fechas': df_resumen.index.strftime('%Y-%m-%d').tolist(),
    'reservas': df_resumen['Reservas'].tolist(),
    'sinReserva': df_resumen['Sin Reserva'].tolist()
}

# Convertir los datos a JSON
data_json = json.dumps(data)

# Crear el contenido HTML con el script de JavaScript
html_content = f'''
<!DOCTYPE html>
<html>
<head>
    <title>Datos del Reporte</title>
</head>
<body>
    <script>
        window.reporteData = {data_json};
    </script>
</body>
</html>
'''

# Crear el subdirectorio si no existe
os.makedirs('public', exist_ok=True)

# Guardar el contenido HTML en un archivo
with open('public/reporte.html', 'w') as file:
    file.write(html_content)

print("Archivo HTML generado correctamente.")
