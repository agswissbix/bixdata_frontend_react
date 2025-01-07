import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import '../app/globals.css'
import { useApi } from '../utils/useApi';
import GenericComponent from './genericComponent';
import { Home, Package, Mail, ChevronDown, ChevronUp } from 'lucide-react';

//INTERFACCE
interface MenuItem {
    id: string;
    title: string;
    icon: React.ElementType; // Adjust the type if you're passing React components
    href?: string;
    subItems?: SubItem[];
  }
  
  interface SubItem {
    id: string;
    title: string;
    href: string;
  }
  

  
  interface ResponseData {
    menuItems: Record<string, MenuItem>;
  }

// VARIABILI PER LO SVILUPPO
const sidebarMenuDataDEV: ResponseData = {
    menuItems: {
      home: {
        id: "home",
        title: "Home",
        icon: Home, // Nome dell'icona come stringa (se stai utilizzando stringhe nel progetto)
        href: "#",
        subItems: [], // Aggiunto un array vuoto per uniformità con la struttura
      },
      prodotti: {
        id: "prodotti",
        title: "Prodotti",
        icon: Package, // Nome dell'icona come stringa
        subItems: [
          { id: "cat1", title: "Categoria 1", href: "#" },
          { id: "cat2", title: "Categoria 2", href: "#" },
          { id: "cat3", title: "Categoria 3", href: "#" },
          { id: "cat4", title: "Categoria 4", href: "#" },
        ],
      },
      contatti: {
        id: "contatti",
        title: "Contatti",
        icon: Mail, // Nome dell'icona come stringa
        href: "#",
        subItems: [], // Aggiunto per coerenza
      },
    },
  };
  

interface SidebarMenuProps {
    setSelectedMenu: (item: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({setSelectedMenu}) => {
    const [sidebarMenuData, setSidebarMenuData] = useState<ResponseData>({
        menuItems: {}, // Oggetto vuoto per inizializzare `menuItems`
      });
    const [openDropdown, setOpenDropdown] = useState('');
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    

    const handleMouseEnter = (section: string) => {
        setActiveTooltip(section);
    };

    const handleMouseLeave = () => {
        setActiveTooltip(null);
    };

    const handleMenuClick = (item: string) => {
        // Gestione interna del click
        setSelectedMenu(item); // Comunica al componente padre la selezione
      };

    // Payload for backend request (unchanged)
    const payload = useMemo(() => ({
        apiRoute: 'get_sidebarmenu_items',
        additionalInfo: {
            example2: 'example',
            example3: 'example',
        },
    }), []);

    const { response, loading, error } = useApi<ResponseData>(payload);

    // USA I DATI DI TEST NEL FRONTEND
    
    useEffect(() => {
        setSidebarMenuData(sidebarMenuDataDEV);
    }, []); 
    

    // USA I DATI DAL BACKEND
    /*
    useEffect(() => {
        if (response) {
            setSidebarMenuData(response);
        }
    }, [response]);
    */
    



    return (
        //usa il compontente generico per gestire gli stati di loading e di error
        <GenericComponent response={response} loading={loading} error={error}> 
            {(data) => (
                
                        <div className="bg-gray-800 text-white h-screen
                                    xl:w-64 w-16 transition-all duration-300">
                            <ul className="list-none p-0 m-0">
                                    {Object.entries(sidebarMenuData['menuItems']).map(([key, item]) => (
                                    <li key={item.id} className="border-b border-gray-700 relative" onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
                                        {item.subItems ? (
                                            // Dropdown section
                                            <div>
                                                <button onClick={() => setOpenDropdown(openDropdown === item.id ? '' : item.id)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-700 transition-colors" >
                                                    <div className="flex items-center min-w-[20px]">
                                                        <item.icon className="w-5 h-5 min-w-[20px]"/>
                                                        <span className="ml-3 xl:opacity-100 opacity-0 transition-opacity duration-300">{item.title}</span>
                                                    </div>
                                                    <span className="xl:block hidden">
                                                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${ openDropdown === item.id ? '-rotate-180' : ''}`}
                                                      />
                                                    </span>
                                                </button>
                
                                                {/* Tooltip for mobile */}
                                                {activeTooltip === item.id && (
                                                    <div
                                                        className="absolute left-full top-0 ml-2 bg-gray-700 rounded-md shadow-lg py-2 min-w-[160px] z-50 xl:hidden">
                                                        <div className="px-4 py-2 font-semibold border-b border-gray-600">
                                                            {item.title}
                                                        </div>
                                                        <ul className="py-1">
                                                            {item.subItems.map((subItem) => (
                                                                <li key={subItem.id}  >
                                                                    <span  className="block px-4 py-2 hover:bg-gray-600 transition-colors" onClick={() => console.log('Test funzionante')}> {subItem.title} </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                
                                                {/* Dropdown menu for desktop */}
                                                <div
                                                    className={`xl:block hidden overflow-hidden transition-all duration-300 ease-in-out ${
                                                        openDropdown === item.id ? 'max-h-48' : 'max-h-0'
                                                    }`}
                                                >
                                                    <ul className="bg-gray-900 py-2">
                                                        {item.subItems.map((subItem) => (
                                                            <li key={subItem.id}>
                                                                <span className="block px-12 py-2 hover:bg-gray-700 transition-colors" onClick={() => handleMenuClick(subItem.id)}> 
                                                                    {subItem.title}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            // Regular link section
                                            <a
                                                href={item.href}
                                                className="flex items-center px-6 py-4 hover:bg-gray-700 transition-colors"
                                            >
                                                <item.icon className="w-5 h-5 min-w-[20px]" />
                                                <span className="ml-3 xl:opacity-100 opacity-0 transition-opacity duration-300">
                                  {item.title}
                                </span>
                                            </a>
                                        )}
                
                                        {/* Tooltip for regular items */}
                                        {!item.subItems && activeTooltip === item.id && (
                                            <div className="absolute left-full top-0 ml-2 bg-gray-700 rounded-md shadow-lg py-2 px-4 whitespace-nowrap z-50 xl:hidden">
                                                {item.title}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
            )}
        </GenericComponent>

    );
};

export default SidebarMenu;
