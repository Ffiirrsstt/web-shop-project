import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  displayError(err: any) {
    const dataError = Object.entries(err) as [string, string[]][];
    let message = '';

    dataError.forEach(([key, value]: [string, string[]]) => {
      const formattedValue = value.join('\n');
      message += `<strong>${key} :</strong>\n${formattedValue}\n`;
    });

    return message;
  }
}
