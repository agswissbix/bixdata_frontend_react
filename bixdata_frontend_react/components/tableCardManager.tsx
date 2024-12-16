import TableComp from "@/components/table";
import CardComp from "@/components/card";
import { useState } from "react";







const TableCardManager: React.FC = () => {

    const [openCards, setOpenCards] = useState<number[]>([]);
    const [closingCard, setClosingCard] = useState<number | null>(null);
    const [fullscreenCard, setFullscreenCard] = useState<boolean | null>(null);
    
    const handleCloseCard = (id: number) => {
        setClosingCard(id);
        setFullscreenCard(null);
    
        setTimeout(() => {
            setOpenCards(openCards.filter(openId => openId !== id));
            setClosingCard(null);
        }, 300);
    };
    
    const handleRowClick = (id: number) => {
        if (!openCards.includes(id)) {
            setOpenCards([id, ...openCards]);
        }
    };

    return (
        <div className="w-full h-full p-2">
            <TableComp onRowClick={handleRowClick} />

            {openCards.length > 0 && (
                <div className={`absolute top-0 right-0 p-2 rounded-lg transition-all duration-300 ${fullscreenCard !== null ? 'w-5/6 h-5/6' : 'w-2/6 h-3/4'}`}>
                    <CardComp
                        openCards={openCards}
                        closingCard={closingCard}
                        onCloseCard={handleCloseCard}
                        setFullscreenCard={setFullscreenCard}
                    />
                </div>
            )}

        </div>
        )
}

export default TableCardManager;