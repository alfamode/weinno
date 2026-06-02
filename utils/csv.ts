import * as fs from 'fs';

export function parseCsv(filePath: string): any[] {
    const csvData = fs.readFileSync(filePath, 'utf8');
    const parts = csvData.split('"');
    for (let i = 1; i < parts.length; i += 2)
        parts[i] = parts[i].replace(/,/g, '/comma-seperated/').replace(/\r?\n/g, ' ');
    const processedData = parts.join('');
    const [headerLine, ...lines] = processedData.split('\n').filter(line => line.trim() !== '');
    const headers = headerLine.split(',').map(h => h.trim());

    return lines.map(line => {
        const values = line.split(',').map(v => v.trim());
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index].replace(/\/comma-seperated\//g, ',').trim();
            return obj;
        }, {} as any);
    });
}
