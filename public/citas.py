import pandas as pd
import json
import os

# Cargar el archivo CSV
df = pd.read_csv('atencionP.csv', encoding='latin1')

# Convertir la columna de fecha a tipo datetime
df['fecha'] = pd.to_datetime(df['fecha'])

# Filtrar las reservas
df_reservas = df[df['reserva'] == True]

# Contar las citas atendidas y canceladas por día
citas_atendidas = df_reservas[df_reservas['asistencia'] == 'completado'].groupby(df_reservas['fecha'].dt.date).size()
citas_canceladas = df_reservas[df_reservas['asistencia'] == 'cancelado'].groupby(df_reservas['fecha'].dt.date).size()

# Crear un DataFrame con las dos series
df_citas = pd.DataFrame({
    'Citas Atendidas': citas_atendidas,
    'Citas Canceladas': citas_canceladas
}).fillna(0)

# Asegurarse de que el índice del DataFrame es de tipo datetime
df_citas.index = pd.to_datetime(df_citas.index)

# Convertir los datos a un diccionario para JSON
data = {
    'fechas': df_citas.index.strftime('%Y-%m-%d').tolist(),
    'citas_atendidas': df_citas['Citas Atendidas'].tolist(),
    'citas_canceladas': df_citas['Citas Canceladas'].tolist()
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
with open('public/reporte_citas.html', 'w') as file:
    file.write(html_content)

print("Archivo HTML generado correctamente.")
