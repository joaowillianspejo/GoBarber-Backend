import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider month availability', async () => {
    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 13, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 10, 19, 10, 0, 0).getTime();
    });

    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'user_id',
      year: 2021,
      month: 11,
      day: 19,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, availability: false },
        { hour: 9, availability: false },
        { hour: 13, availability: false },
        { hour: 14, availability: true },
        { hour: 15, availability: false },
        { hour: 16, availability: true },
      ]),
    );
  });
});
