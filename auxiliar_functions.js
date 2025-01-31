// SÓLO SE TOMARAN LAS FILAS QUE CONTENGAN LOS SIGUIENTES VALORES
const fecha_facturacion = "27-01-2025 0:00:00";
const tipo_documento = "Factura Electrónica";

// SON AQUELLAS COLUMNAS EN LAS QUE SE BUSCARAN LOS VALORES CRÍTICOS
const colConditions = [
  "J", // CLIENTE OT
  "BM", // RECEPCIONISTA
];

// VALORES QUE SE UTILIZARÁN PARA FILTRAR LAS TABLAS
// FILAS CON ESTOS VALORES QUEDARÁN ELIMINADAS
// CADA ARRAY DENTRO CORRESPONDE A UNA COLUMNA, EJ:
// LOS VALORES DESDE STELLANTIS HASTA EL FINAL DEL ARRAY, SERÁN BUSCADOS EN LA COLUMNA J,
const criticalValues = [
  [
    "STELLANTIS CHILE S.A.",
    "BRUNO CHIARELLA .",
    "AUTOMOTORES FRANCO CHILENA SA . .",
    "CRISTIAN ANDRÉS AVILA HERNÍQUEZ",
  ], //CLIENTE OT
  ["MACARENA ROJAS ", "MACARENA ROJAS"], // RECEPCIONISTAS
];

export function filtrarFila(array) {
  for (let i = 0; i < colConditions.length; i++) {
    const rowName = colConditions[i];
    const valueIndex = rowNames.indexOf(rowName);

    if (valueIndex === -1) continue;

    const cellValue = array[valueIndex];

    if (criticalValues[i].includes(cellValue)) {
      console.log(`Fila eliminada por contener valor ${cellValue}`);
      return true;
    }
  }
  return false;
}

export function seleccionarFila(array) {
  const indexC = rowNames.indexOf("C");
  const indexB = rowNames.indexOf("B");
  if (indexC == -1 || indexB == -1) {
    console.log("Índice no encontrado");
    return false;
  }

  if (array[indexC] === tipo_documento && array[indexB] === fecha_facturacion) {
    return true;
  }

  if (!array[indexC] === "Factura Electrónica") {
    console.log(
      `Fila eliminada por contener valor ${array[indexC]} en vez de Factura Electrónica`
    );
  }

  if (!array[indexB] === "28-01-2025 0:00:00") {
    console.log(`Fila eliminada por ser de la fecha ${array[indexB]}`);
  }

  return false;
}

// Lista de columnas a leer
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
