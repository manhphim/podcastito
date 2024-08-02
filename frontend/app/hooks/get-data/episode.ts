import {
  getEpisodesByFeedUrl,
  getEpisodesByFeedId,
  getEpisodesByFeedIdWithPagination,
  searchEpisodes,
} from '../../api/episode';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export function useGetEpisodesByFeedURL(url: string) {
  return useQuery({
    queryKey: ['Episodes', url],
    queryFn: () => getEpisodesByFeedUrl,
  });
}

export function useGetEpisodesByFeedId(id: number) {
  return useQuery({
    queryKey: ['Episodes', id],
    queryFn: () => getEpisodesByFeedId(id),
  });
}

export function useGetEpisodesByFeedIdWithPagination(feedId: number, pageParam: any) {
  return useInfiniteQuery({
    queryKey: ['Episodes', pageParam, feedId],
    queryFn: ({ pageParam }) => getEpisodesByFeedIdWithPagination({ feedId, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.nextOffset >= lastPage.total) {
        return;
      }
      return lastPage.nextOffset;
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day in milliseconds
  });
}

export function useSearchEpisodes(query: string, pageParam: any) {
  return useInfiniteQuery({
    queryKey: ['SearchEpisodes', query],
    queryFn: () => searchEpisodes(query, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.nextOffset >= lastPage.total) {
        return;
      }
      return lastPage.nextOffset;
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day in milliseconds
  });
}
