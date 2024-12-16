import React from 'react';


const CardBadge: React.FC = () => {
    return(
        <div className="h-1/6 w-full bg-gray-100">
            <div className="flex flex-row h-1/2">
                <p className="w-1/3 text-center">test1</p>
                <p className="w-1/3 text-center">test2</p>
                <p className="w-1/3 text-center">test3</p>
            </div>
            <div className="flex flex-row h-1/2">
                <p className="w-1/3 text-center">test4</p>
                <p className="w-1/3 text-center">test5</p>
                <p className="w-1/3 text-center">test6</p>
            </div>
        </div>
    )
}


export default CardBadge;