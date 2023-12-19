import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface CSVRow {
  Link: string;
  Text: string;
  Label: string;
}
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const CsvProcessor: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (file) {
            Papa.parse<CSVRow>(file, {
                header: true,
                complete: async (results: { data: any; }) => {
                    for (const row of results.data) {
                        const formattedData = formatData(row);
                        console.log(formattedData);
                        await sendData(formattedData);
                        await delay(3000);
                    }
                }
            });
        }
    };

    const formatData = (row: CSVRow) => {
        return {
            news: row.Text,
            url: row.Link,
            valid: row.Label === 'TRUE'
        };
    };

    const sendData = async (data: any) => {
        try {
            const response = await axios.post("/api/add-to-vectorstore", data);
            console.log('Data sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div>
            <Input type="file" onChange={handleFileChange} accept=".csv" />
            <Button onClick={handleSubmit}>Process CSV</Button>
        </div>
    );
};

export default CsvProcessor;
