import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  let pipe: TimePipe;

  beforeEach(() => {
    pipe = new TimePipe();
    jest.spyOn(Date, 'now').mockReturnValue(1_000_000_000_000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if no value is provided', () => {
    expect(pipe.transform(0)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should return seconds ago if under 60 seconds', () => {
    const unixTime = 1_000_000_000 - 10;
    expect(pipe.transform(unixTime)).toBe('10 seconds ago');
  });

    it('should return minutes ago if under 60 minutes', () => {
    const unixTime = 1_000_000_000 - 120;
    expect(pipe.transform(unixTime)).toBe('2 minutes ago');
  });

  it('should return hours ago if under 24 hours', () => {
    const unixTime = 1_000_000_000 - 7200;
    expect(pipe.transform(unixTime)).toBe('2 hours ago');
  });

  it('should return days ago if 24 hours or more', () => {
    const unixTime = 1_000_000_000 - 172800;
    expect(pipe.transform(unixTime)).toBe('2 days ago');
  });
});
