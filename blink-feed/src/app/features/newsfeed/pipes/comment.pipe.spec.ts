import { CommentPipe } from './comment.pipe';

describe('CommentPipe', () => {
  let pipe: CommentPipe;

  beforeEach(() => {
    pipe = new CommentPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "discuss" when count is 0', () => {
    expect(pipe.transform(0)).toBe('discuss');
  });

  it('should return "1 comment" when count is 1', () => {
    expect(pipe.transform(1)).toBe('1 comment');
  });

  it('should return "2 comments" when count is 2', () => {
    expect(pipe.transform(2)).toBe('2 comments');
  });
});
