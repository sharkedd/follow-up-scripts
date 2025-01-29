const colConditions = [
  "J", // CLIENTE OT
  "BM", // RECEPCIONISTA
];

const criticalValues = [
  ["STELLANTIS CHILE S.A."], //CLIENTE OT
  ["MACARENA ROJAS"], // RECEPCIONISTAS
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
  if (indexC == -1) {
    console.log("Índice no encontrado");
    return false;
  }

  if (array[indexC] === "Factura Electrónica") {
    return true;
  }

  console.log(`FILA ELIMINADA POR NO CONTENER VALOR ${array[indexC]}`);
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
