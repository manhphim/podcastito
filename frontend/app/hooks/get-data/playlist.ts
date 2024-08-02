import { useQuery } from '@tanstack/react-query';
import { getPlaylists } from '../../api/playlist';

export function useGetPlaylists() {
  return useQuery({
    queryKey: ['Playlists'],
    queryFn: getPlaylists,
  });
}
