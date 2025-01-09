import React, {useEffect} from 'react';
import {useState} from "react";
import { Home, Package, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import LoadingComp from './loading';
import ReactDOM from 'react-dom';
import axiosInstance from '../utils/axios';
import SidebarMenu from './sidebarMenu';


  
interface SidebarProps {
    setSelectedMenu: (item: string) => void;
}


const Sidebar: React.FC<SidebarProps> = ({setSelectedMenu}) => {

    return (
        <div className="w-1/12 h-full"> 
           <SidebarMenu setSelectedMenu={(item) => setSelectedMenu(item)} ></SidebarMenu>
        </div>
    );
};

export default Sidebar;