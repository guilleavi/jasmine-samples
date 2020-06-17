import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsyncCodeService {

  daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  daysResult1 = [];
  daysResult2 = [];

  constructor() { }

  getDaysInPromise(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.daysArray);
      }, 1000);
    });
  }

  getErrorMessageInPromise(): Promise<any> {
    return new Promise<string[]>((resolve, reject) => {
      setTimeout(() => {
        reject('fail');
      }, 1000);
    });
  }

  async getAllWeekDays(): Promise<string[]> {
    let days: string[];

    await this.getDaysInPromise().then(result => {
      days = result;
      days.push('Saturday');
      days.push('Sunday');
    });

    return days;
  }

  getWeekDays(): Promise<string[]> {
    return this.getDaysInPromise();
  }

  async getMessageWithAsyncAwait() {
    let message: string;

    await this.getErrorMessageInPromise().then(
      success => {
        message = 'Success!!!';
      },
      error => {
        message = 'Error!!!';
      }
    );

    return message;
  }

  getResultsWithNestedPromises() {
    this.getDaysInPromise().then(result1 => {
      this.daysResult1 = result1;
      this.getDaysInPromise().then(result2 => {
        this.daysResult2 = result2;
      });
    });
  }

}
