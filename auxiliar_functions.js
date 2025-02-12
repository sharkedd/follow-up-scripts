// SÓLO SE TOMARAN LAS FILAS QUE CONTENGAN LOS SIGUIENTES VALORES
import {
  fecha_facturacion,
  fecha_facturacion2,
  tipo_documento,
  colConditions,
  criticalValues,
  rowNames,
} from "./constants.js";

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

  if (
    /*array[indexC] === tipo_documento && */ array[indexB] ===
      fecha_facturacion ||
    array[indexB] === fecha_facturacion2
  ) {
    return true;
  }

  // Condiciones creadas para entregar información sobre eliminación
  if (!array[indexC] === tipo_documento) {
    console.log(
      `Fila eliminada por contener valor ${array[indexC]} en vez de Factura Electrónica`
    );
  }

  if (
    !array[indexB] === fecha_facturacion ||
    !array[indexB] === fecha_facturacion2
  ) {
    console.log(`Fila eliminada por ser de la fecha ${array[indexB]}`);
  }

  return false;
}
