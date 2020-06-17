import { async, TestBed, tick, fakeAsync, flush } from '@angular/core/testing';

import { AsyncCodeService } from './async-code.service';

describe('AsyncCodeService', () => {

  let service: AsyncCodeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    });
  }));

  beforeEach(() => {
    service = TestBed.get(AsyncCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return full list of days using async/await', async () => {
    const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const result = await service.getAllWeekDays();

    expect(result).toEqual(daysArray);

    await expectAsync(service.getDaysInPromise()).toBeResolvedTo(service.daysArray);
  });

  it('should get days in promise', (done) => {
    const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    service.getWeekDays().then(result => {
      expect(result).toEqual(daysArray);
      done();
    });

  });

  it('should return error message using async await', async () => {
    const message = 'Error!!!';

    const result = await service.getMessageWithAsyncAwait();

    expect(result).toEqual(message);

    await expectAsync(service.getErrorMessageInPromise()).toBeRejectedWith('fail');
  });

  it('should get results from nested promises with fakeAsync and flush', fakeAsync(() => {
    const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    service.getResultsWithNestedPromises();

    flush();

    expect(service.daysResult1).toEqual(daysArray);
    expect(service.daysResult2).toEqual(daysArray);
  }));

  it('should get results from nested promises with done and timeout', (done) => {
    const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    service.getResultsWithNestedPromises();

    setTimeout(() => {
      expect(service.daysResult1).toEqual(daysArray);
      done();
    }, 1000);

    setTimeout(() => {
      expect(service.daysResult2).toEqual(daysArray);
      done();
    }, 5000);
  });
});
