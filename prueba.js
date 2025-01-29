import * as XLSX from "xlsx";
import fs from "fs";
import {
  filtrarFila,
  rowNames,
  seleccionarFila,
} from "./auxiliar_functions.js";

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

// Contador para mostrar las columnas modificadas
let rowsModified = 0;
let rowsDeleted = 0;

// Índices de las columnas a verificar
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
  // Se insertan las columnas a copiar en el array (A-Q ; AY-BO)
  const newRow = rowNames.map((colLetter) => {
    const cellAddress = colLetter + row;
    return sheet[cellAddress] ? sheet[cellAddress].v : null;
  });

  if (filtrarFila(newRow)) {
    rowsDeleted++;
    continue;
  }

  if (!seleccionarFila(newRow)) {
    rowsDeleted++;
    continue;
  }

  // SI CLIENTE SALE STELLANTIS, INTERCAMBIAR VALORES
  if (
    newRow[indexAY] === "STELLANTIS CHILE S.A." &&
    indexJ !== -1 &&
    indexBD !== -1 &&
    indexO !== -1
  ) {
    newRow[indexAY] = newRow[indexJ];
    newRow[indexBD] = newRow[indexO];
    console.log(`Dato actualizado: STELLANTIS ==> ${newRow[indexAY]}`);
    rowsModified++;
  }

  newSheetData.push(newRow);
}

console.log(`Se modificaron ${rowsModified} columnas.`);
console.log(`Se eliminaron ${rowsDeleted} filas.`);
// Transformar Array y agregar en nuevo libro
const newSheet = XLSX.utils.aoa_to_sheet(newSheetData);
XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Filas Copiadas");

// Guardar nuevo libro
const newFilePath = "./excel/filas_copiadas.xlsx";
XLSX.writeFile(newWorkbook, newFilePath);
console.log(`Excel filtrado almacenado en ${newFilePath}`);
