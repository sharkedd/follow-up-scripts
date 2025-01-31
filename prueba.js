import * as XLSX from "xlsx";
import fs from "fs";
import {
  filtrarFila,
  rowNames,
  seleccionarFila,
} from "./auxiliar_functions.js";

// Abrir el archivo original
// EJ: "./excel/base de datos 21 y 22 de enero.xlsx";
const filePath = "./excel/base de datos 27 y 28 de enero.xlsx";

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

// Crear nuevo libro y datos filtrados
const newWorkbook = XLSX.utils.book_new();
const newSheetData = [];

// Rango de la hoja original
const range = XLSX.utils.decode_range(sheet["!ref"]);

// Contador para modificaciones y eliminaciones
let rowsModified = 0;
let rowsDeleted = 0;

// Índices de las columnas a verificar
const indexAY = rowNames.indexOf("AY");
const indexJ = rowNames.indexOf("J");
const indexBD = rowNames.indexOf("BD");
const indexO = rowNames.indexOf("O");

// Leer todas las filas
for (let row = 1; row <= range.e.r; row++) {
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

  // Modificación para "STELLANTIS CHILE S.A."
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

// **Eliminar el archivo si ya existe**
const newFilePath = "./excel/filas_copiadas.xlsx";
if (fs.existsSync(newFilePath)) {
  fs.unlinkSync(newFilePath); // Borra el archivo antes de escribirlo de nuevo
}

// Guardar nuevo libro
XLSX.writeFile(newWorkbook, newFilePath);
console.log(`Excel filtrado almacenado en ${newFilePath}`);
