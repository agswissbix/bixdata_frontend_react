import React from 'react';

interface CardBadgeProps {
    badgeItems: BadgeItem[];
}

interface BadgeItem {
    fieldid: string;
    value: string;
}

const mockBixData: BadgeItem[] = [
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
];

const CardBadge: React.FC = () => {
    const [badgeItems, setBadgeItems] = React.useState<BadgeItem[]>(mockBixData);

    return (
        <div className="h-full w-full bg-gray-100 flex justify-center items-center">
            <div className="flex flex-wrap justify-center w-full h-3/6">
                {badgeItems.map((item) => (
                    <p key={item.fieldid} className="w-1/3 text-center text-black">
                        {item.value}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default CardBadge;
