/**
 * Camada temporária de comunicação do frontend SAFEpass.
 *
 * O backend definitivo pode substituir este módulo mantendo as funções
 * de domínio e os componentes desacoplados da URL/implementação HTTP.
 * Não armazene tokens no browser: a sessão atual usa cookie httpOnly.
 */
export type ApiError = { message: string; status: number; code?: string };
export type ApiResult<T> = { data: T; status: number };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

export class ApiRequestError extends Error {
  readonly status: number;
  readonly code?: string;
  constructor(error: ApiError) {
    super(error.message);
    this.name = "ApiRequestError";
    this.status = error.status;
    this.code = error.code;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  /** Desativa o cache para dados pessoais ou mutáveis. */
  noCache?: boolean;
};

export async function apiRequest<T>(
  path: `/${string}`,
  options: RequestOptions = {},
): Promise<ApiResult<T>> {
  const { body, noCache = true, headers, ...init } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    cache: noCache ? "no-store" : init.cache,
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload: unknown = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const value = payload && typeof payload === "object"
      ? payload as { error?: unknown; message?: unknown; code?: unknown }
      : {};
    throw new ApiRequestError({
      status: response.status,
      message: typeof value.message === "string"
        ? value.message
        : typeof value.error === "string"
          ? value.error
          : "Não foi possível concluir a solicitação.",
      code: typeof value.code === "string" ? value.code : undefined,
    });
  }

  return { data: payload as T, status: response.status };
}

export const api = {
  get<T>(path: `/${string}`) {
    return apiRequest<T>(path, { method: "GET" });
  },
  post<T>(path: `/${string}`, body?: unknown) {
    return apiRequest<T>(path, { method: "POST", body });
  },
  put<T>(path: `/${string}`, body?: unknown) {
    return apiRequest<T>(path, { method: "PUT", body });
  },
  patch<T>(path: `/${string}`, body?: unknown) {
    return apiRequest<T>(path, { method: "PATCH", body });
  },
  delete<T>(path: `/${string}`) {
    return apiRequest<T>(path, { method: "DELETE" });
  },
};
