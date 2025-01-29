import * as XLSX from "xlsx";
import fs from "fs";

// Abrir el archivo
const filePath = "./excel/base de datos 21 y 22 de enero.xlsx";

// Verificar si el archivo existe
if (!fs.existsSync(filePath)) {
  console.error("El archivo no existe");
  process.exit(1);
}

const fileBuffer = fs.readFileSync(filePath);
const workbook = XLSX.read(fileBuffer, { type: "buffer" });

// Obtener la primera hoja
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Nuevo libro donde se copiará la información
const newWorkbook = XLSX.utils.book_new();
const newSheetData = [];

// Rango de la hoja original
const range = XLSX.utils.decode_range(sheet["!ref"]);

// Lista de columnas a leer
const rowNames = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "AY",
  "AZ",
  "BA",
  "BB",
  "BC",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BK",
  "BL",
  "BM",
  "BN",
  "BO",
  "BP",
];

let rowsModified = 0;
// Obtener los índices de las columnas relevantes
const indexAY = rowNames.indexOf("AY");
const indexJ = rowNames.indexOf("J");
const indexBD = rowNames.indexOf("BD");
const indexO = rowNames.indexOf("O");

console.log(indexAY);
console.log(indexJ);
console.log(indexBD);
console.log(indexO);

// Leer todas las filas
for (let row = 1; row <= range.e.r; row++) {
  const newRow = rowNames.map((colLetter) => {
    const cellAddress = colLetter + row;
    return sheet[cellAddress] ? sheet[cellAddress].v : null;
  });

  // SI CLIENTE SALE STELLANTIS, INTERCAMBIAR VALORES
  if (
    newRow[indexAY] === "STELLANTIS CHILE S.A." &&
    indexJ !== -1 &&
    indexBD !== -1 &&
    indexO !== -1
  ) {
    newRow[indexAY] = newRow[indexJ];
    newRow[indexBD] = newRow[indexO];
    console.log(`Dato actualizado: STELLANTIS a ==> ${newRow[indexAY]}`);
    rowsModified++;
  }

  newSheetData.push(newRow);
}

console.log(`Se modificaron ${rowsModified} columnas.`);
// Transformar Array y agregar en nuevo libro
const newSheet = XLSX.utils.aoa_to_sheet(newSheetData);
XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Filas Copiadas");

// Guardar nuevo libro
const newFilePath = "./excel/filas_copiadas.xlsx";
XLSX.writeFile(newWorkbook, newFilePath);
console.log(`Excel filtrado almacenado en ${newFilePath}`);
console.log(`Excel filtrado almacenado en ${newFilePath}`);
