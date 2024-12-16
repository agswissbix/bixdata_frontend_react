interface TableCompProps {
    onRowClick: (id: number) => void;  // Funzione per gestire il clic sulla riga
}


interface TableRows {
    name: string;
    rows: TableRow[];
}

interface TableRow {
    value: string;
}

const tablerows = [
    {
        id: 1,
        productname: "Apple MacBook Pro 17",
        color: "Silver",
        category: "Laptop",
        price: "$2999"
    },
    {
        id: 2,
        productname: "Microsoft Surface Pro",
        color: "White",
        category: "Laptop PC",
        price: "$1999"
    },
    {
        id: 3,
        productname: "Magic Mouse 2",
        color: "Black",
        category: "Accessories",
        price: "$99"
    }
];

const TableComp: React.FC<TableCompProps> = ({ onRowClick }) => {
    return (
        <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Product name</th>
                    <th scope="col" className="px-6 py-3">Color</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                </tr>
                </thead>
                <tbody>
                {tablerows.map((row) => (
                    <tr
                        key={row.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => onRowClick(row.id)}  // Passa l'ID della riga selezionata
                    >
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {row.productname}
                        </th>
                        <td className="px-6 py-4">{row.color}</td>
                        <td className="px-6 py-4">{row.category}</td>
                        <td className="px-6 py-4">{row.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComp;
