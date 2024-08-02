import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getCategories, getCategoriesWithPagination } from '../../api/category';

export function useGetCategories() {
  return useQuery({
    queryKey: ['Categories'],
    queryFn: getCategories,
  });
}

export function useGetCategoriesWithPagination(pageParam) {
  return useInfiniteQuery({
    queryKey: ['CategoriesPagination', pageParam],
    queryFn: ({ pageParam }) => getCategoriesWithPagination({ pageParam }),
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
