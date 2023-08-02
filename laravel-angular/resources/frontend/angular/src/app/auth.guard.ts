import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CanActivate, CanActivateFn } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private router: Router) {}

    canActivate: CanActivateFn = (route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        } else {
            return this.router.parseUrl('/login-user');
        }
    };
}
