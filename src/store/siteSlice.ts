import {
  addSiteAPI,
  editSiteAPI,
  getAllSitesAPI,
  getSiteAPI,
} from '@/api/site';
import type { ISiteRecord } from '@/interfaces/site';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

interface SitesState {
  sites: ISiteRecord[] | null;
  setSites: (sites: ISiteRecord[]) => void;
  clearSites: () => void;
}

const useSiteStore = create<SitesState>((set) => ({
  sites: null,
  setSites: (sites) => {
    console.log('Setting sites in store:', sites);
    set({ sites });
  },
  clearSites: () => {
    console.log('Clearing sites in store:');
    set({ sites: null });
  },
}));

export const useAddSite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSiteAPI,
    onSuccess: (newSite) => {
      // Update the sites list in cache
      queryClient.setQueryData(
        ['sites'],
        (oldSites: ISiteRecord[] | undefined) => {
          return oldSites ? [...oldSites, newSite] : [newSite];
        }
      );
    },
    onError: (error) => {
      console.error('Error adding site:', error);
    },
  });
};

export const useGetSiteById = (id: string) => {
  return useQuery({
    queryKey: ['site', id],
    queryFn: () => getSiteAPI(Number(id)),
    enabled: !!id, // Only run if id exists
  });
};

export const useUpdateSite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editSiteAPI,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      queryClient.invalidateQueries({ queryKey: ['site', id] });
    },
    onError: (error) => {
      console.error('Error updating site:', error);
      // Optional: Show error toast
      // toast.error('Failed to update site');
    },
  });
};

export const useGetAllSites = () => {
  return useQuery({
    queryKey: ['sites'],
    queryFn: getAllSitesAPI,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export default useSiteStore;
