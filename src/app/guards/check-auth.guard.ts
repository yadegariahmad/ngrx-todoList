import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CheckAuthGuard implements CanActivate
{
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean
  {
    const userId = localStorage.getItem('userId');

    if (userId && userId !== 'undefined')
    {
      return true;
    } else
    {
      this.router.navigateByUrl('/Auth');
      return false;
    }
  }
}
