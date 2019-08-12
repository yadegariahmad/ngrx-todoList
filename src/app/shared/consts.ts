import { environment } from '../../environments/environment';

export const API_URL = !environment.production
  ? 'http://localhost:8080'
  : 'https://ahmad-todolist-api.herokuapp.com';
