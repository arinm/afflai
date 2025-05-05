import type { Ref } from 'vue';

interface ApiResponse<T> {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  pending: Ref<boolean>;
  refresh: () => Promise<void>;
}

export function useApi<T>(key: string, handler: () => Promise<T>): ApiResponse<T> {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const pending = ref(true);

  const fetchData = async () => {
    try {
      pending.value = true;
      error.value = null;
      data.value = await handler();
    } catch (err) {
      error.value = err as Error;
      console.error(`Error fetching ${key}:`, err);
    } finally {
      pending.value = false;
    }
  };

  // Initial fetch
  onMounted(fetchData);

  return {
    data,
    error,
    pending,
    refresh: fetchData,
  };
}

export function useApiWithParams<T, P>(
  key: string | ((params: P) => string),
  handler: (params: P) => Promise<T>
) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const pending = ref(false);

  const fetchData = async (params: P) => {
    try {
      pending.value = true;
      error.value = null;
      data.value = await handler(params);
    } catch (err) {
      error.value = err as Error;
      console.error(`Error in ${typeof key === 'string' ? key : key(params)}:`, err);
    } finally {
      pending.value = false;
    }
  };

  return {
    data,
    error,
    pending,
    fetchData,
  };
}
