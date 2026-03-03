import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CoffeeMethod,
  CoffeeMethodDetailsDto,
  CoffeeMethodSaveDto,
  CoffeeMethodType,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class CoffeeMethodService {
  private apiUrl = `http://localhost:8080/coffee-methods`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<CoffeeMethod[]> {
    return this.http.get<CoffeeMethod[]>(this.apiUrl);
  }

  findAllByType(type: CoffeeMethodType): Observable<CoffeeMethod[]> {
    return this.http.get<CoffeeMethod[]>(`${this.apiUrl}/types/${type}`);
  }

  findById(id: string | null): Observable<CoffeeMethodDetailsDto> {
    return this.http.get<CoffeeMethodDetailsDto>(`${this.apiUrl}/${id}`);
  }

  create(method: CoffeeMethodSaveDto): Observable<CoffeeMethod> {
    return this.http.post<CoffeeMethod>(this.apiUrl, method);
  }

  update(
    id: number,
    method: CoffeeMethodSaveDto,
  ): Observable<CoffeeMethodDetailsDto> {
    return this.http.put<CoffeeMethodDetailsDto>(
      `${this.apiUrl}/${id}`,
      method,
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
