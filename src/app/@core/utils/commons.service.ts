import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
/*
export class CommonServices {
  constructor() {}
  static graphqlError(error) {
    if (!error) return "Ups... something happend";
    if (error.networkError) {
      if (
        error.networkError.error.errors.length > 0 &&
        error.networkError.error.errors[0].extensions.code == "UNAUTHENTICATED"
      )
        return "Permiso denegado";
      if (error.networkError.status == 400) return "Solicitud incorrecta";
      if (error.networkError.status == 0) return "Servidor desconectado";
      return "Ha habido un problema con la conexión";
    } else if (error.graphQLErrors) {
      if (
        error.graphQLErrors.length > 0 &&
        error.graphQLErrors[0].extensions.code == "UNAUTHENTICATED"
      )
        return "Permiso denegado";
      return "Ups... something happend";
    } else return "Ups... something happend";
  }

}*/
 /* getObjectByFilter(el, id) {
    return el.filter((x) => x._id == id) || {};
  }

  getObjectByFind(el, id) {
    return el.find((x) => x._id == id) || {};
  }

  getIndexById(el, id) {
    return el.findIndex((x) => x._id === id) || false;
  }*/
/**
   *
   * Group of Helpers to find elements in Object
   *
   */
function filter(el, id) {
  return el.filter((x) => x._id == id) || {};
}

function find(el, id) {
  return el.find((x) => x._id == id) || {};
}

function index(el, id) {
  return el.findIndex((x) => x._id === id) || false;
}


/**
   *
   * Autocomplete Functions
   *
   */


/**
 *
 * @param source List of the elements to find a match. Forexemple data from DB
 * @param control Form field
 * @param by Fields to be filtered
 */
function loadAutocomplete(
  source: any[],
  control: FormControl,
  by: any,
  multiple: boolean = true
) {
  return control.valueChanges.pipe(
    startWith(""),
    map((value) =>
      value
        ? multiple
          ? _filterAutocomplete(source, value, by)
          : _filterAutocompleteMultiple(source, value, by)
        : source.slice()
    )
  );
}

/**
 * Filter to transform the showed messages in the autocomplete
 * @param source  List of the elements to find a match. Forexemple data from DB
 * @param value Value type for the user in the field
 * @param by Field to be filtered
 */
function _filterAutocomplete(source: any[], value: string, by: string): any[] {
  const filterValue = value.toLowerCase();
  return source.filter((x) => x[by].toLowerCase().indexOf(filterValue) === 0);
}

/**
 * Filter improved to accept multiples fields
 * @param source  List of the elements to find a match. Forexemple data from DB
 * @param value Value type for the user in the field
 * @param filters Fields to be filtered
 */
function _filterAutocompleteMultiple(
  source: Array<any>,
  value: string,
  filters: Array<string>
): Array<any> {
  const filterValue = value.toLowerCase();
  return source.filter((item) => {
    var matches = false;
    filters.forEach(function (valor) {
      if (item[valor].toLowerCase().indexOf(filterValue) === 0) matches = true;
    });
    return matches;
  });
}

export { filter, find, index, loadAutocomplete };
