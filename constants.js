// CONSTANTES DE RUTA DE EXCEL
export const filePath = "./excel/base de datos 29 de enero.xlsx"; // Ruta del archivo a leer
export const newFilePath = "cargas/Carga 29-01.xlsx"; // Ruta donde se almacenará el archivo filtrado
export const newExcelName = "filas_copiadas";

// CONSTANTES DE SELECCIÓN
export const fecha_facturacion = "29-01-2025 0:00:00"; // Se seleccionarán las filas que tengan esta fecha de facturación
export const tipo_documento = "Factura Electrónica"; // Se seleccionarán las filas que tengan este tipo de documento

// COLUMNAS A ANALIZAR (Para eliminar filas)
export const colConditions = [
  //"J", // Columna correspondiente a Cliente OT
  "BM", // Columna correspondiente a Recepcionista
];

// VALORES QUE SE BUSCARÁN EN LAS COLUMNAS ANTERIORES
export const criticalValues = [
  // Se eliminaran las filas que contengan los siguientes valores en la columna J (Cliente OT)
  /*[
    "STELLANTIS CHILE S.A.",
    "BRUNO CHIARELLA .",
    "AUTOMOTORES FRANCO CHILENA SA . .",
    "CRISTIAN ANDRÉS AVILA HERNÍQUEZ",
  ],
  */
  // Se eliminaran las filas que contengan alguno de los siguientes valosres en la columna BM (Recepcionista)
  ["MACARENA ROJAS ", "MACARENA ROJAS"],
];

// LISTA DE COLUMNAS
export const rowNames = [
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
