// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exportToCsv<T extends Record<string, any>>(filename: string, data: T[]) {
  if (data.length === 0) {
    console.warn("No data to export.");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add header row
  csvRows.push(headers.join(','));

  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      // Handle null, undefined, and values that might contain commas or newlines
      if (val === null || val === undefined) {
        return '';
      }
      const stringVal = String(val);
      if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
        return `"${stringVal.replace(/"/g, '""')}"`; // Escape double quotes and wrap in quotes
      }
      return stringVal;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  if (link.download !== undefined) { // Feature detection for download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Fallback for browsers that don't support download attribute
    alert('Please use a modern browser to download the CSV file.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function importFromCsv<T extends Record<string, any>>(csvString: string): T[] {
  const lines = csvString.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) {
    return [];
  }

  const headers = lines[0].split(',').map(header => header.trim());
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    if (values.length === headers.length) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const obj: Record<string, any> = {}; // Use Record<string, any> for assignment
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = values[j];
      }
      result.push(obj as T); // Cast back to T when pushing to result
    } else {
      console.warn(`Skipping malformed row: ${lines[i]}`);
    }
  }
  return result;
}

// Helper function to parse a CSV line, handling quoted fields
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let inQuote = false;
  let currentField = '';

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuote && line[i + 1] === '"') { // Escaped double quote
        currentField += '"';
        i++; // Skip the next quote
      } else {
        inQuote = !inQuote;
      }
    } else if (char === ',' && !inQuote) {
      result.push(currentField.trim());
      currentField = '';
    } else {
      currentField += char;
    }
  }
  result.push(currentField.trim()); // Add the last field
  return result;
}
