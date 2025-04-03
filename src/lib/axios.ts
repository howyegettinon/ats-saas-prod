// src/lib/axios.ts
import axios from "axios"
import { getToken, refreshToken } from "@/auth/utils"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(null, async (error) => {
  if (error.response?.status === 401) {
    await refreshToken()
    return api.request(error.config)
  }
  return Promise.reject(error)
})
