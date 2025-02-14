import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import axiosInstance from "@/utils/axios";


const Enable2FA = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const enable2FA = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.post('/backend_app/enable_2fa/');
        setQrCodeUrl(response.data.qr_code); // usa il base64 dal backend
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError("Errore nell'abilitare 2FA: " + error.response?.data?.message);
        } else {
          setError("Errore nell'abilitare 2FA");
        }
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <button 
          onClick={enable2FA} 
          disabled={loading}
        >
          {loading ? 'Generazione in corso...' : 'Genera QR Code per 2FA'}
        </button>
        
        {error && <p className="error">{error}</p>}
        
        {qrCodeUrl && (
          <div>
            <h3>Scansiona il QR code con l'app di autenticazione</h3>
            <img src={`data:image/png;base64,${qrCodeUrl}`} alt="QR Code" />
          </div>
        )}
      </div>
    );
  };

export default Enable2FA;
