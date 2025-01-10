import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import { useApi } from '../../../utils/useApi';
import GenericComponent from '../../genericComponent';

interface propsInterface {
    tableid: string;
    recordid: string;
}

interface ResponseInterface {
    badgeItems: Array<{
        fieldid: string;
        value: string;
    }>
}

const componentDataDEV: ResponseInterface = {
    badgeItems: [
        {
            fieldid: "test1",
            value: "test1"
        },
        {
            fieldid: "test2",
            value: "test2"
        },
        {
            fieldid: "test3",
            value: "test3"
        },
        {
            fieldid: "test4",
            value: "test4"
        },
        {
            fieldid: "test5",
            value: "test5"
        },
        {
            fieldid: "test6",
            value: "test6"
        }
    ]
};

const componentDataDEFAULT: ResponseInterface = {
    badgeItems: []
  };

const CardBadge: React.FC<propsInterface> = (tableid, recordid) => {
    const [componentData, setComponentData] = useState<ResponseInterface>(componentDataDEV);

    const payload = useMemo(() => ({
        apiRoute: 'testpost', // riferimento api per il backend
        example1: tableid,
        additionalInfo: {
            example2: 'example',
            example3: 'example',
        },
    }), [tableid]);

    // Usa l'hook passando il payload
    const { response, loading, error } = useApi<ResponseInterface>(payload);


    return (
        <GenericComponent response={componentData} loading={loading} error={error}> 
            {(data: ResponseInterface) => (
                
                <div className="h-1/3 w-full bg-gray-100 flex justify-center items-center">
                    <div className="flex flex-wrap justify-center w-full h-3/6">
                        {data.badgeItems.map((item) => (
                            <p key={item.fieldid} className="w-1/3 text-center text-black">
                                {item.value}
                            </p>
                        ))}
                    </div>
                </div>

            )}
        </GenericComponent>
    );
}

export default CardBadge;





