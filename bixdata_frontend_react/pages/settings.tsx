// components/ComponentA.tsx
import React, {useEffect} from 'react';
import {useState} from "react";
import Select from '../components/htmlComponents/select';
import { Suspense } from 'react';
import LoadingComp from "@/components/loading";
import axiosInstance from "@/utils/axios";
import dynamic from "next/dynamic";
import TableSettings from '@/components/settings/table/tableSettings';
import FieldSettings from '@/components/settings/table/fieldSettings';

const TablesList = dynamic(() => import("@/components/settings/table/tablesList"), {
    suspense: true,
    loading: () => <LoadingComp /> // Aggiungi questo
});
    
const SettingsPage: React.FC = () => {

    const [usersList, setUsersList] = useState([]);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [workspacesTables, setworkspacesTables] = useState([]);

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value);
        getWorkspacesTables();
    };

    const getWorkspacesTables = async () => {
        setworkspacesTables([]);
        try {
            const response = await axiosInstance.post('settings/get_workspaces_tables/', {user: selectedValue});
            setworkspacesTables(response.data.workspaces);
            console.info(response.data.workspaces);
        } catch (error) {
            console.error('Errore durante il recupero della lista workspaces', error);
        }
    }

    const getUsersList = async () => {
        try {
            const response = await axiosInstance.post('settings/get_users_list/');
            setUsersList(response.data.users);
            console.info(response.data.users);
        } catch (error) {
            console.error('Errore durante il recupero della lista utenti', error);
        }
    };

    useEffect(() => {
        getUsersList();
        getWorkspacesTables();
    }, []);

    return (
        <div className="w-full h-full flex">
            <div className="w-1/5 h-full p-2.5">
                <Select
                    name="select-user"
                    options={usersList}
                    value={selectedValue}
                    onChange={handleUserChange}
                />
            </div>
            <div className="w-1/5 h-full p-2.5">
                <TablesList workspaces={workspacesTables} />
            </div>
            <div className="w-1/5 h-full p-2.5">
                <TableSettings />
            </div>
            <div className="w-1/5 h-full p-2.5">
                <FieldSettings />
            </div>
            <div className="w-1/5 h-full p-2.5"></div>
        </div>
    );
};

export default SettingsPage;
