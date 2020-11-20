export class CommonServices {
    constructor() { }
    static graphqlError(error) {
        if(!error)  return ('Ups... something happend');
        if (error.networkError) {
            if (error.networkError.error.errors.length > 0 && error.networkError.error.errors[0].extensions.code == 'UNAUTHENTICATED')
            return ('Permiso denegado');
            if (error.networkError.status == 400) return ('Solicitud incorrecta');
            if (error.networkError.status == 0) return ('Servidor desconectado');
            return ('Ha habido un problema con la conexión');
        }
        else if (error.graphQLErrors) {
            if (error.graphQLErrors.length > 0 && error.graphQLErrors[0].extensions.code == 'UNAUTHENTICATED')
                return ('Permiso denegado');
            return ('Ups... something happend');
        } else return ('Ups... something happend');
    }
    getObjectByFilter(el,id){
        return el.filter(x => x._id === id || {});
    };
    
     getObjectByFind(el,id){
        return el.find(x => x._id === id || {});
    };

    getIndexById(el,id){
        return el.findIndex(x => x._id === id || false);
    };

}