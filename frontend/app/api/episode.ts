import apiClient from './apiClient';

const getEpisodesByFeedUrl = (feedUrl: string) =>
  apiClient.get(`/episodes/byFeedURL/${feedUrl}`).then((res) => res.data);
const getEpisodesByFeedId = (feedId: number) => apiClient.get(`/episodes/byFeedId/${feedId}`).then((res) => res.data);

const getEpisodesByFeedIdWithPagination = async ({ feedId, pageParam }: any) => {
  const result = await apiClient.get(`/episodes/byFeedId/${feedId}?offset=${pageParam}&limit=10`);
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

const searchEpisodes = async (query: string, pageParam: any) => {
  const result = await apiClient.get(`/episodes/bySearch?query=${query}?offset=${pageParam}&limit=10`);
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

export { getEpisodesByFeedUrl, getEpisodesByFeedId, getEpisodesByFeedIdWithPagination, searchEpisodes };
