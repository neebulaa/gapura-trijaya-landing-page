import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { OutletContextInterface } from '@/types/global/outletContext';

export type useGetAxiosProps = {
  config: AxiosRequestConfig<any>;
  queryKey: readonly any[];
  removeQueryKey?: readonly any[];
  invalidateQueryKey?: readonly any[];
  queryParams?: any | undefined;
  refresh?: number;
  enabled?: boolean;
};

const useGetAxios = <T extends any>(props: useGetAxiosProps) => {
  const {
    config,
    queryKey,
    removeQueryKey,
    invalidateQueryKey,
    queryParams,
    enabled = true,
  } = props;

  const { openNotification } = useOutletContext<OutletContextInterface>();

  const queryClient = useQueryClient();

  const axiosGet = async () => {
    const response = await axios<T>({
      ...config,
      params: queryParams,
    });
    return response.data;
  };

  const result: UseQueryResult<T> = useQuery({
    enabled: enabled,
    queryKey: queryKey,
    queryFn: axiosGet,
    // keepPreviousData: true,
  });

  useEffect(() => {
    if (result.status === 'success') {
      if (invalidateQueryKey) {
        queryClient.invalidateQueries({
          queryKey: invalidateQueryKey,
        });
      }

      if (removeQueryKey) {
        queryClient.removeQueries({
          queryKey: removeQueryKey,
          type: 'inactive',
        });
      }
    }

    if (result.status === 'error') {
      if ((result.error as any).response!.status == 401) {
        //TODO: Redirect to login page or refresh token
      } else {
        openNotification({
          type: 'error',
          title: 'Error',
          message: (result.error as any).response.data.message,
        });
      }
    }
  }, [result.status]);

  useEffect(() => {
    if (result.isPaused) {
      openNotification({
        type: 'error',
        title: 'Error',
        message: 'Terjadi Kesalahan Pada Internet Anda, Silahkan Coba Lagi.',
      });
    }
  }, [result.isPaused]);

  return result;
};
export default useGetAxios;
