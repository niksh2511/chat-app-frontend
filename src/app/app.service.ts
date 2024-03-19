import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly baseServerUrl: string = environment.baseServerUrl;

  public chatGroup!: FormGroup

  constructor(private fb: FormBuilder,
    private hc: HttpClient) { 

    this.initailizeForm();
  }


  private initailizeForm = () => {
    this.chatGroup = this.fb.group({
      message: ['', [Validators.required]]
    })
  }

  public sendMessage = (obj: any): Observable<any> => {
    return this.hc.post(this.baseServerUrl + "api/message", obj);
  }
}
