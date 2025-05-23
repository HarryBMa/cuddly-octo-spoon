import ExcelJS from 'exceljs';

export async function importExcelFile(file: File): Promise<any[]> {
  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.worksheets[0];
  const rows: any[] = [];
  const headers: string[] = [];
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    headers.push(cell.text);
  });
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const rowData: any = {};
    row.eachCell((cell, colNumber) => {
      rowData[headers[colNumber - 1]] = cell.text;
    });
    rows.push(rowData);
  });
  return rows;
}
