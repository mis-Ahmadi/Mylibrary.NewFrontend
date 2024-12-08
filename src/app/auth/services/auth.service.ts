import { inject, Injectable } from '@angular/core';
import { BackendService } from '../../!shared/!services/backend.service';
import { AuthRequest } from '../models/auth.requesy';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
backend=inject(BackendService);
login(data: AuthRequest){
  return this.backend.post('login',data);
}
}
