import apiClient from './apiClient';

interface getCategoriesProps {
  pageParam: number;
  limit: number;
}
const getCategories = () => apiClient.get('/categories').then((res) => res.data);

const getCategoriesWithPagination = async ({ pageParam }: any) => {
  const result = await apiClient.get(`/categories?offset=${pageParam}&limit=10`);

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

export { getCategories, getCategoriesWithPagination, getCategoriesProps };
