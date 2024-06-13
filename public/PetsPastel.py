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

# Contar las mascotas atendidas por especie
atenciones_por_species = merged_df['species'].value_counts()

# Convertir los datos a un diccionario para JSON
data = {
    'species': atenciones_por_species.index.tolist(),
    'counts': atenciones_por_species.tolist()
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
        window.reportePetsData = {data_json};
    </script>
</body>
</html>
'''

# Crear el subdirectorio si no existe
os.makedirs('public', exist_ok=True)

# Guardar el contenido HTML en un archivo
with open('public/reporte_pets.html', 'w') as file:
    file.write(html_content)

print("Archivo HTML generado correctamente.")
