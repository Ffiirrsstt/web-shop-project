import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Configuration } from '../swagger/configuration';
import { BASE_PATH } from '../swagger/variables';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  protected basePath = environment.apiBase;

  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   *
   *
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiUpdateCart(
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiUpdateCart(
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiUpdateCart(
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiUpdateCart(
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json',
      'text/json',
      'application/_*+json',
    ];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>(
      'patch',
      `${this.basePath}/Cart/updateCart`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   *
   * @param pathData
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCartGet(
    id: number,
    username: string,
    selectDefault: boolean,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiCartGet(
    id: number,
    username: string,
    selectDefault: boolean,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiCartGet(
    id: number,
    username: string,
    selectDefault: boolean,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiCartGet(
    id: number,
    username: string,
    selectDefault: boolean,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (
      id === null ||
      id === undefined ||
      username === null ||
      username === undefined
    ) {
      throw new Error('An id or username is required to use the apiCartGet.');
    }

    if (selectDefault === null || selectDefault === undefined)
      selectDefault = false;

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get(
      `${this.basePath}/Cart/getCart?id=${id}&username=${encodeURIComponent(
        username
      )}&selectDefault=${selectDefault}`,
      {
        responseType: 'json',
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
