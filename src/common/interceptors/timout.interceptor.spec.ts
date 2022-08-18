import { TimeoutInterceptor } from './timeout.interceptor';

describe('TimoutInterceptor', () => {
  it('should be defined', () => {
    expect(new TimeoutInterceptor()).toBeDefined();
  });
});
