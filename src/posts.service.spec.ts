import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(() => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2020-01-01T00:00:00.000Z'));

    const createdPost1 = postsService.create(post);
    const createdPost2 = postsService.create({ text: 'Another post' });

    expect(createdPost1).toEqual(
      expect.objectContaining({
        id: '2',
        text: post.text,
        date: '2020-01-01T00:00:00.000Z',
      }),
    );

    expect(createdPost2).toEqual(
      expect.objectContaining({
        id: '3',
        text: 'Another post',
        date: '2020-01-01T00:00:00.000Z',
      }),
    );

    expect(postsService.find('2')).toEqual(createdPost1);
    expect(postsService.find('3')).toEqual(createdPost2);

    jest.useRealTimers();
  });

  it('should find a post', () => {
    const preExistingPostId = '1';

    const foundPost = postsService.find(preExistingPostId);

    expect(foundPost).toEqual(
      expect.objectContaining({
        id: preExistingPostId,
        text: 'Some pre-existing post',
        date: expect.any(String),
      }),
    );

    expect(postsService.find('999')).toBeUndefined();
  });
});