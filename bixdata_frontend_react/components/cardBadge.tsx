import React from 'react';

interface CardBadgeProps {
    badgeItems: BadgeItem[];
}

interface BadgeItem {
    fieldid: string;
    value: string;
}

const CardBadge: React.FC = () => {
    return(
        <div className="h-1/6 w-full bg-gray-100">
            <div className="flex flex-row h-1/2">
                <p className="w-1/3 text-center text-black">test1</p>
                <p className="w-1/3 text-center text-black">test2</p>
                <p className="w-1/3 text-center text-black">test3</p>
            </div>
            <div className="flex flex-row h-1/2">
                <p className="w-1/3 text-center text-black">test4</p>
                <p className="w-1/3 text-center text-black">test5</p>
                <p className="w-1/3 text-center text-black">test6</p>
            </div>
        </div>
    )
}


export default CardBadge;