import { ToastrService } from 'ngx-toastr';

export class commonsService {
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
    static center= {
        lat: 33.5362475,
        lng: -111.9267386
      };
}