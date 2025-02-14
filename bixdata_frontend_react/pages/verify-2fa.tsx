import { useState } from "react";
import axios from "axios";
import axiosInstance from "@/utils/axios";

const Verify2FA = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const verifyOTP = async () => {
    try {
      const response = await axiosInstance.post('/backend_app/verify_2fa/', 
        { otp: otp }, // Aggiungi il codice OTP nel body
        { 
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage("Errore nella verifica del codice OTP: " + error.response?.data?.message);
      } else {
        setMessage("Errore nella verifica del codice OTP");
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Inserisci codice OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOTP}>Verifica</button>
      <p>{message}</p>
    </div>
  );
};

export default Verify2FA;
