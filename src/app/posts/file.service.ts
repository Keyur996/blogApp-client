import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BACKEND_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFiles(filesFormData: FormData) {
    return this.http.post<{ success: boolean; files: string[] }>(
      `${BACKEND_URL}/upload`,
      filesFormData
    );
  }
}
