import React, { useState } from "react";
import axios from "axios";

const TestConnection = () => {
  // Stato per memorizzare la risposta
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Funzione per gestire il click e fare la richiesta HTTP
  const handleTestConnection = () => {
    setLoading(true); // Impostare lo stato di caricamento a true
    setError(null);    // Resettare eventuali errori precedenti

    axios
      .get("http://localhost:8001/backend_app/test_connection/")
      .then((response) => {
        setResponseData(response.data); // Salvare la risposta nel state
        console.log(response);           // Mostrare la risposta in console
      })
      .catch((error) => {
        setError(error.message);         // Gestire eventuali errori
        console.log(error);              // Mostrare l'errore in console
      })
      .finally(() => {
        setLoading(false);               // Impostare lo stato di caricamento a false
      });
  };

  return (
    <div>
      <button onClick={handleTestConnection} disabled={loading}>
        {loading ? "Caricamento..." : "Testa la Connessione"}
      </button>

      {error && <p style={{ color: "red" }}>Errore: {error}</p>}
      {responseData && (
        <div>
          <h3>Risposta del server:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestConnection;
