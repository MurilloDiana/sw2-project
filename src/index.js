import React, { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import ApolloProviderComponent from './ApolloClient'; // Asegúrate de importar el componente correctamente
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";

// Obtiene el elemento raíz
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Suspense fallback={<Loader />}>
    <ApolloProviderComponent>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProviderComponent>
  </Suspense>,
);

// Medir el rendimiento de la aplicación
reportWebVitals();
