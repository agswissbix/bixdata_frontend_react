import React from 'react';

interface CardFieldsProps {
    tableid: string;
    recordid: string;
    fields: Field[];
}

interface Field {
    fieldid: string;
    description: string;
    value: string;
    fieldtype: string;
}

const mockBixData: Field[] = [
    {
        fieldid: "test1",
        description: "Test 1",
        value: "test1",
        fieldtype: "Parola"
    },
    {
        fieldid: "test2",
        description: "Test 2",
        value: "test2",
        fieldtype: "Parola"
    },
    {
        fieldid: "test3",
        description: "Test 3",
        value: "test3",
        fieldtype: "Parola"
    },
    {
        fieldid: "test4",
        description: "Test 4",
        value: "test4",
        fieldtype: "Parola"
    },
    {
        fieldid: "test5",
        description: "Test 5",
        value: "test5",
        fieldtype: "Parola"
    },
    {
        fieldid: "test6",
        description: "Test 6",
        value: "test6",
        fieldtype: "Parola"
    }
];

const CardFields: React.FC = () => {
    const [fields, setFields] = React.useState<Field[]>(mockBixData);
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    {fields.map(field => (
                        <div key={field.fieldid}>
                            <p className="text-black">{field.description}</p>
                        </div>
                    ))}
                </div>
                <div style={{ flex: 1 }}>
                    {fields.map(field => (
                        <div key={field.fieldid}>
                            <p className="text-black border-2">{field.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CardFields;
