import React from "react";
import { Settings } from 'lucide-react';


interface Table {
    id: string;
    name: string;
    workspaceorder: number;
}

interface Workspace {
    id: string;
    name: string;
    icon: string;
    order: number;
    tables: Table[];
}

interface Workspaces {
    workspaces?: Workspace[];
}

const TablesList: React.FC<Workspaces> = ({ workspaces = [] }) => {

    return (
        <div className="top-0 transition-all duration-300 ease-out w-full h-5/6 cursor-default overflow-auto">
            {workspaces.map((workspace) => (
                <div className="z-10 top-0 bg-gray-50 rounded-lg shadow-md transition-all duration-300 ease-out border border-gray-300 w-full cursor-default overflow-auto mx-auto p-2.5 mb-5 mt-5 ">
                        <h2 className="font-bold">{workspace.name}</h2>
                                {workspace.tables.map((table) => (
                                    <div className="z-10 top-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-out border border-gray-300 w-full cursor-default overflow-auto mx-auto p-2.5 mb-2 mt-2 flex items-center justify-between">
                                        <div className="w-1/12 h-full p-1">
                                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  "/>
                                        </div>
                                        <div className="w-9/12 h-full p-1">
                                            <span>{table.name}</span>

                                        </div>
                                        <div className="w-2/12 h-full flex items-center justify-end space-x-2">
                                            <button type="button"
                                                    className="rounded-full text-gray-600 hover:text-gray-400 focus:text-gray-400  ">
                                                <Settings/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                </div>
            ))}
        </div>
    );
};

export default TablesList;
