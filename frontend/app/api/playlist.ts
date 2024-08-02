import apiClient from './apiClient';

const getPlaylists = () => apiClient.get('/playlists').then((res) => res.data);
const editPlaylist = (playlistId :string) => apiClient.post(`/playlists/edit/${playlistId}`).then((res) => res.data);
const addPlaylist = (playlistId :string) => apiClient.post(`/playlists`).then((res) => res.data);
export { getPlaylists, editPlaylist, addPlaylist };
