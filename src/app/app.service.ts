import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  formGroup!: any;
  constructor(private _fb: FormBuilder, private _http: HttpClient) {}
  initForm() {
    this.formGroup = this._fb.group({
      array: this._fb.array([]),
    });
  }
  push(item: any) {
    const group = this._fb.group({
      ...item,
    });
    this.array.push(group);
  }
  getTodos(): void {
    this.initForm();
    this._http.get('https://jsonplaceholder.typicode.com/todos').subscribe({
      next: (todos: any) => {
        todos.map((todo: any) => {
          this.push(todo);
        });
      },
    });
  }
  get array(): FormArray {
    return this.formGroup.get('array') as FormArray;
  }
}
