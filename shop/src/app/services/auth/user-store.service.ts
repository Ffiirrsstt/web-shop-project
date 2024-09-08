import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  // private role$ = new BehaviorSubject<string>('');
  private id$ = new BehaviorSubject<number>(0);
  private username$ = new BehaviorSubject<string>('');
  // private email$ = new BehaviorSubject<string>('');
  // private FirstName$ = new BehaviorSubject<string>('');
  // private LastName$ = new BehaviorSubject<string>('');

  constructor() {}

  // public getRole = () => this.role$.asObservable();
  // public setRole = (role: string) => this.role$.next(role);

  public getId = () => this.id$.asObservable();
  public setId = (id: number) => this.id$.next(id);

  public getUsername = () => this.username$.asObservable();
  public setUsername = (username: string) => this.username$.next(username);

  // public getEmailContact = () => this.email$.asObservable();
  // public setEmailContact = (email: string) => this.email$.next(email);

  // public getFirstName = () => this.FirstName$.asObservable();
  // public setFirstName = (FirstName: string) => this.FirstName$.next(FirstName);

  // public getLastName = () => this.LastName$.asObservable();
  // public setLastName = (LastName: string) => this.LastName$.next(LastName);
}
