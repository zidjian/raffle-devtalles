import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url, config);
      return data;
    } catch (error) {
      const err = error;

      console.log(err.response?.data);

      throw new BadRequestException(`${err.response.data.message}`);
    }
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<T> {
    try {
      const { data: response } = await this.axios.post<T>(url, data, config);
      return response;
    } catch (error) {
      const err = error;

      console.log(err.response?.data);

      throw new BadRequestException(`${err.response.data.error_description}`);
    }
  }
}
