import apiClient from './axios/axios-instance';

// const isCanceled = (err: unknown) => (err as any)?.code === "ERR_CANCELED";

export function withCancel(config: any) {
  const controller = new AbortController();
  const promise = apiClient.request({ ...config, signal: controller.signal });
  return { controller, promise, cancel: () => controller.abort() };
}
