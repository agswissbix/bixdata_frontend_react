import axiosInstance from '../../utils/axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metodo non consentito' });
    }

    const postData = req.body;

    try {
        // Check if `apiRoute` is present in postData
        if (!postData.apiRoute) {
            return res.status(400).json({ error: 'apiRoute is required in the request body.' });
        }

        let response;

        // Determine the backend endpoint based on `apiRoute`
        if (postData.apiRoute === 'testpost') {
            response = await axiosInstance.post('/backend_custom_test/testpost/', postData);
        } else if (postData.apiRoute === 'get_sidebarmenu_items') {
            response = await axiosInstance.post('/backend_app/get_sidebarmenu_items/', postData);
        }else if (postData.apiRoute === 'get_table_records') {
            response = await axiosInstance.post('/backend_app/get_table_records/', postData);
        }else if (postData.apiRoute === 'get_record_badge') {
            response = await axiosInstance.post('/backend_app/get_record_badge/', postData);
        }else if (postData.apiRoute === 'set_record_fields') {
            response = await axiosInstance.post('/backend_app/set_record_fields/', postData);
        }
        else {
            return res.status(400).json({ error: 'Invalid apiRoute provided.' });
        }

        // Return the response data to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Errore durante il fetch:', error);
        res.status(500).json({ error: 'Errore durante il recupero dei dati.' });
    }
}
