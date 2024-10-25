import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpClient = inject(HttpClient);

  getUser(userId: string): Observable<IUser> {
    return this.httpClient
      .get<IUser[]>('http://localhost:4200/json_data/users.json')
      .pipe(map((user) => user.filter((p) => p.Id === userId)[0]));
  }
}
