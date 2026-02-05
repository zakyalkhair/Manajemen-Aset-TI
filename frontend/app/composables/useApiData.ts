import type { AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '~/types/api'

export const useApiData = () => {
  const { $api } = useNuxtApp()

  const get = async <T>(url: string, config?: AxiosRequestConfig) => {
    const res = await $api.get<ApiResponse<T>>(url, config)
    return res.data.data
  }

  const post = async <T>(url: string, body?: any, config?: AxiosRequestConfig) => {
    const res = await $api.post<ApiResponse<T>>(url, body, config)
    return res.data.data
  }

  const put = async <T>(url: string, body?: any, config?: AxiosRequestConfig) => {
    const res = await $api.put<ApiResponse<T>>(url, body, config)
    return res.data.data
  }

  const patch = async <T>(url: string, body?: any, config?: AxiosRequestConfig) => {
    const res = await $api.patch<ApiResponse<T>>(url, body, config)
    return res.data.data
  }

  const del = async <T>(url: string, config?: AxiosRequestConfig) => {
    const res = await $api.delete<ApiResponse<T>>(url, config)
    return res.data.data
  }

  return {
    get,
    post,
    put,
    patch,
    del,
  }
}

