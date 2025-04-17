// utils/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

// Crea un'istanza axios preconfigurata
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8001/', // Base URL del backend Django
    withCredentials: true, // Invia automaticamente i cookie di sessione con ogni richiesta
});

// Variabile per memorizzare il token CSRF
let csrfToken: string | null = null;
let isCheckingSession = false; // Flag per evitare loop

// Interceptor per la richiesta: aggiunge il token CSRF quando necessario
axiosInstance.interceptors.request.use(async (config) => {

    // Aggiungi il token CSRF alle richieste POST, PUT, PATCH, DELETE, escludendo il login
    if (config.url !== 'login/') {
        const csrfToken = Cookies.get('csrftoken');
        config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
});



export default axiosInstance;
