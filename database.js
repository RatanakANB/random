export let cardData = [];
export let categoryTitle = ''; // New variable to store the category title

export function loadExcelData(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        // Extract data from specified columns starting from row 0
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
            range: 2, // Start from row 1 (0-indexed) to ignore headers
            header: ['id', 'name', 'weight', 'title'] // Specify column headers
        });

        cardData = jsonData.map((row, index) => ({
            id: row.id,
            name: row.name,
            weight: row.weight,
            title: row.title || ''
        }));

        // Extract category title from the first row and first column
        categoryTitle = firstSheet['B1'] ? firstSheet['B1'].v : '';

        document.dispatchEvent(new Event('dataLoaded')); // Dispatch event after data is loaded
    };
    reader.readAsArrayBuffer(file);
}

export function clearDatabase() {
    cardData = [];
    categoryTitle = ''; // Clear category title
}

export function getCategoryTitle() {
    return categoryTitle;
}
