import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import axiosInstance from "@/utils/axios";

const Disable2FA = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const disable2FA = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post('/backend_app/disable_2fa/');
        setMessage(response.data.message);
      } catch (error) {
        setMessage((error as any).response?.data?.message || "Errore nella disattivazione del 2FA");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <button 
          onClick={disable2FA}
          disabled={loading}
        >
          {loading ? 'Disattivazione in corso...' : 'Disabilita 2FA'}
        </button>
        {message && <p>{message}</p>}
      </div>
    );
  };
  
  export default Disable2FA;