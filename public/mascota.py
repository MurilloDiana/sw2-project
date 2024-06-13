import pandas as pd
import json
import os

# Cargar los archivos CSV
pets_df = pd.read_csv('petsP.csv', encoding='latin1')
atencion_df = pd.read_csv('atencionP.csv', encoding='latin1')

# Convertir la columna de fecha a tipo datetime en atencion_df
atencion_df['fecha'] = pd.to_datetime(atencion_df['fecha'])

# Unir ambos DataFrames en el campo pet_id
merged_df = atencion_df.merge(pets_df, left_on='pet_id', right_on='id')

# Contar las mascotas atendidas por día y por especie
atenciones_por_dia_species = merged_df.groupby([merged_df['fecha'].dt.date, 'species']).size().unstack(fill_value=0)

# Asegurarse de que el índice del DataFrame es de tipo datetime
atenciones_por_dia_species.index = pd.to_datetime(atenciones_por_dia_species.index)

# Convertir los datos a un diccionario para JSON
data = {
    'fechas': atenciones_por_dia_species.index.strftime('%Y-%m-%d').tolist(),
    'especies': atenciones_por_dia_species.columns.tolist(),
    'atenciones': atenciones_por_dia_species.to_dict(orient='list')
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
with open('public/reporte_mascotas.html', 'w') as file:
    file.write(html_content)

print("Archivo HTML generado correctamente.")
