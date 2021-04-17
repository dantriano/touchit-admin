import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthenticationService } from "app/@core/services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
  /*
  ensureAuthenticated = function(req, res, next) {
      if(!req.headers.authorization) {
        return res
          .status(403)
          .send({message: "Tu petición no tiene cabecera de autorización"});
      }
      
      var token = req.headers.authorization.split(" ")[1];
      var payload = jwt.decode(token);
      

16  if(payload.exp <= moment().unix()) {
17     return res
18        .status(401)
19        .send({message: "El token ha expirado"});
20  }
21  
22  req.user = payload.sub;
      req.user = payload.sub;
    }*/
}
