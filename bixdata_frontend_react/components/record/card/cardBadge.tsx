import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import { useApi } from '../../../utils/useApi';
import GenericComponent from '../../genericComponent';
import { consoleDebug } from '../../../utils/develop'

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


const CardBadge: React.FC<propsInterface> = ({ tableid, recordid }) => {
    consoleDebug('CardBadge tableid', tableid);
    const [componentData, setComponentData] = useState<ResponseInterface>(componentDataDEFAULT);

    const payload = useMemo(() => ({
        apiRoute: 'get_record_badge', // riferimento api per il backend
        tableid: tableid,
        recordid: recordid
    }), [tableid, recordid]);

    // Usa l'hook passando il payload
    const { response, loading, error } = useApi<ResponseInterface>(payload);
    useEffect(() => {
        if (response) {
            setComponentData(response);
        }
    }, [response]);

    return (
        <GenericComponent response={componentData} loading={loading} error={error}> 
            {(data: ResponseInterface) => (
                <div className="h-full w-full flex justify-center items-center">
                    <div className="flex flex-wrap justify-center w-full h-5/6 bg-bixcolor-default rounded-xl p-3">
                        {data.badgeItems.map((item) => (
                            <p key={item.fieldid} className="w-1/3 text-center text-white">
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





