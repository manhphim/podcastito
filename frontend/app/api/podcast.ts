import apiClient from './apiClient';

const getPodcasts = () => apiClient.get('/podcasts').then((res) => res.data);
const getPodcastsByCategory = (categoryId: number) =>
  apiClient.get(`/podcasts/byCategory/${categoryId}`).then((res) => res.data);
const getPodcastByFeedUrl = (feedUrl: string) =>
  apiClient.get(`/podcasts/byFeedURL/${feedUrl}`).then((res) => res.data);
const getPodcastByFeedId = (feedId: number) => apiClient.get(`/podcasts/byFeedId/${feedId}`).then((res) => res.data);
const getPodcastByGUID = (guid: string) => apiClient.get(`/podcasts/byGUID/${guid}`).then((res) => res.data);

const getPodcastsWithPagination = async ({ pageParam }: any) => {
  const result = await apiClient.get(`/podcasts?offset=${pageParam}&limit=10`);

  if (result.data.results.length === 0) {
    return;
  }

  const response = {
    ...result.data,
    prevOffset: pageParam,
    nextOffset: pageParam + 10,
  };

  return response;
};

export {
  getPodcasts,
  getPodcastByFeedUrl,
  getPodcastByFeedId,
  getPodcastByGUID,
  getPodcastsByCategory,
  getPodcastsWithPagination,
};
