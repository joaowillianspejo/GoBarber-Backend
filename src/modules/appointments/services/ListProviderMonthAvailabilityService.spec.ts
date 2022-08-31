import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider month availability', async () => {
    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 8, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 9, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 10, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 11, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 12, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 13, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 14, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 15, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 16, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 19, 17, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2021, 10, 20, 10, 0, 0),
    });

    const availability = await listProvidersMonthAvailability.execute({
      provider_id: 'user_id',
      year: 2021,
      month: 11,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 18, availability: true },
        { day: 19, availability: false },
        { day: 20, availability: true },
        { day: 21, availability: true },
      ]),
    );
  });
});
