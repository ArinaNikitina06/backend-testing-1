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
    // реализуйте тест-кейс
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
  });
});