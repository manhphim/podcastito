import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPodcastByFeedId, getPodcasts, getPodcastsByCategory, getPodcastsWithPagination } from '../../api/podcast';

export function useGetPodcasts() {
  return useQuery({
    queryKey: ['podcasts'],
    queryFn: getPodcasts,
  });
}

export function useGetPodcastDetails(id: number) {
  return useQuery({
    queryKey: ['podcasts', id],
    queryFn: () => getPodcastByFeedId(id),
  });
}

export function useGetPodcastsByCategory(categoryId: number) {
  return useQuery({
    queryKey: ['podcasts', categoryId],
    queryFn: () => getPodcastsByCategory(categoryId),
  });
}

export function useGetPodcastsWithPagination(pageParam: any) {
  return useInfiniteQuery({
    queryKey: ['Podcasts', pageParam],
    queryFn: ({ pageParam }) => getPodcastsWithPagination({ pageParam }),
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
