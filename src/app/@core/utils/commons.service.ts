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
function remove(arr, id) {
  return arr?.filter((x) => x._id != id) || {};
}
function replace(arr, arr2) {
  return arr.map((obj) => arr2.find((o) => o._id === obj._id) || obj);
}
function addOrReplace(arr, arr2) {
  arr2.map((o) => {
    arr = index(arr, o._id) >= 0 ? replace(arr, [o]) : add(arr, o);
  });
  return arr;
}
function add(arr, obj) {
  arr.push(obj);
  return arr;
}
function filter(arr, id) {
  return arr?.filter((x) => x._id == id) || {};
}
function find(arr, id) {
  return arr?.find((x) => x._id == id) || {};
}
function index(arr, id) {
  return arr?.findIndex((x) => x._id === id) || false;
}
function genID() {
  return [Math.floor(10000000000000 + Math.random() * 90000000000000)];
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
function loadAutocomplete(source: any[], control: FormControl, by: any) {
  const multiple = Array.isArray(by);
  return control.valueChanges.pipe(
    startWith(""),
    map((value) =>
      value
        ? multiple
          ? _filterAutocompleteMultiple(source, value, by)
          : _filterAutocomplete(source, value, by)
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

export {
  filter,
  find,
  index,
  loadAutocomplete,
  remove,
  replace,
  add,
  addOrReplace,
  genID
};
