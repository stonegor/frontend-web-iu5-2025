/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface NestedAuthor {
  /**
   * Name
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * About
   * @minLength 1
   */
  about: string;
  /** Count v */
  count_v?: number;
  /** Count i */
  count_i?: number;
  /** Count no */
  count_no?: number;
  /** Count li */
  count_li?: number;
  /** Count da */
  count_da?: number;
  /** Count zhe */
  count_zhe?: number;
  /** Count ili */
  count_ili?: number;
  /** Count libo */
  count_libo?: number;
  /** Is active */
  is_active?: boolean;
  /**
   * Image url
   * @format uri
   * @maxLength 200
   */
  image_url?: string | null;
}

export interface PredictionCandidate {
  author: NestedAuthor;
  /** Stage */
  stage?: "EARLY" | "MATURE" | "LATE";
  /** Probability */
  probability?: number;
}

export interface AuthorPrediction {
  /** ID */
  id?: number;
  /** Status */
  status?: "DRAFT" | "DELETED" | "FORMED" | "COMPLETED" | "REJECTED";
  /**
   * Corpus
   * @minLength 1
   */
  corpus?: string;
  authors?: PredictionCandidate[];
  calculated_candidates_count?: number;
  client_email?: string;
}

export interface AuthorPredictionUpdate {
  /**
   * Corpus
   * @minLength 1
   */
  corpus?: string;
  authors?: PredictionCandidate[];
}

export interface Author {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 255
   */
  name?: string;
  /**
   * About
   * @minLength 1
   */
  about?: string;
  /** Count v */
  count_v?: number;
  /** Count i */
  count_i?: number;
  /** Count no */
  count_no?: number;
  /** Count li */
  count_li?: number;
  /** Count da */
  count_da?: number;
  /** Count zhe */
  count_zhe?: number;
  /** Count ili */
  count_ili?: number;
  /** Count libo */
  count_libo?: number;
  /** Is active */
  is_active?: boolean;
  /**
   * Image url
   * @format uri
   * @maxLength 200
   */
  image_url?: string | null;
}

export interface Login {
  /**
   * Email
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface User {
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  is_staff?: boolean;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8000/api",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  authorPredictions = {
    /**
     * No description
     *
     * @tags author-predictions
     * @name AuthorPredictionsList
     * @request GET:/author-predictions/
     * @secure
     */
    authorPredictionsList: (
      query?: {
        status?: string;
        start_date?: string;
        end_date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthorPrediction[], any>({
        path: `/author-predictions/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags author-predictions
     * @name AuthorPredictionsDraftCreate
     * @request POST:/author-predictions/draft/
     * @secure
     */
    authorPredictionsDraftCreate: (
      data: {
        /** ID of the author to add */
        author_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthorPrediction, any>({
        path: `/author-predictions/draft/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags author-predictions
     * @name AuthorPredictionsDraftIconList
     * @request GET:/author-predictions/draft/icon
     * @secure
     */
    authorPredictionsDraftIconList: (params: RequestParams = {}) =>
      this.request<
        {
          id?: number;
          count?: number;
        },
        any
      >({
        path: `/author-predictions/draft/icon`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags author-predictions
     * @name AuthorPredictionsRead
     * @request GET:/author-predictions/{id}/
     * @secure
     */
    authorPredictionsRead: (id: string, params: RequestParams = {}) =>
      this.request<AuthorPrediction, void>({
        path: `/author-predictions/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags author-predictions
     * @name AuthorPredictionsUpdate
     * @request PUT:/author-predictions/{id}/
     * @secure
     */
    authorPredictionsUpdate: (
      id: string,
      data: AuthorPredictionUpdate,
      params: RequestParams = {},
    ) =>
      this.request<AuthorPredictionUpdate, void>({
        path: `/author-predictions/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags author-predictions
     * @name AuthorPredictionsDelete
     * @request DELETE:/author-predictions/{id}/
     * @secure
     */
    authorPredictionsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/author-predictions/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags author-predictions
     * @name AuthorPredictionsCompleteUpdate
     * @request PUT:/author-predictions/{id}/complete/
     * @secure
     */
    authorPredictionsCompleteUpdate: (
      id: string,
      data: {
        /** Action to perform: 'complete' or 'reject' */
        action: "complete" | "reject";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Action to perform: 'complete' or 'reject' */
          action: "complete" | "reject";
        },
        any
      >({
        path: `/author-predictions/${id}/complete/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags author-predictions
     * @name AuthorPredictionsSubmitUpdate
     * @request PUT:/author-predictions/{id}/submit/
     * @secure
     */
    authorPredictionsSubmitUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/author-predictions/${id}/submit/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags author-predictions
     * @name AuthorPredictionsAuthorDelete
     * @request DELETE:/author-predictions/{prediction_id}/author/{author_id}/
     * @secure
     */
    authorPredictionsAuthorDelete: (
      predictionId: string,
      authorId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/author-predictions/${predictionId}/author/${authorId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags author-predictions
     * @name AuthorPredictionsAuthorStageUpdate
     * @request PUT:/author-predictions/{prediction_id}/author/{author_id}/stage/
     * @secure
     */
    authorPredictionsAuthorStageUpdate: (
      predictionId: string,
      authorId: string,
      data: {
        /** New stage for the candidate */
        stage: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** New stage for the candidate */
          stage: string;
        },
        any
      >({
        path: `/author-predictions/${predictionId}/author/${authorId}/stage/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  authors = {
    /**
     * No description
     *
     * @tags authors
     * @name AuthorsList
     * @request GET:/authors/
     * @secure
     */
    authorsList: (
      query?: {
        /** Filter authors by name */
        name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Author[], any>({
        path: `/authors/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsCreate
     * @request POST:/authors/
     * @secure
     */
    authorsCreate: (data: Author, params: RequestParams = {}) =>
      this.request<Author, any>({
        path: `/authors/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsRead
     * @request GET:/authors/{id}/
     * @secure
     */
    authorsRead: (id: string, params: RequestParams = {}) =>
      this.request<Author, void>({
        path: `/authors/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsUpdate
     * @request PUT:/authors/{id}/
     * @secure
     */
    authorsUpdate: (id: string, data: Author, params: RequestParams = {}) =>
      this.request<Author, any>({
        path: `/authors/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsDelete
     * @request DELETE:/authors/{id}/
     * @secure
     */
    authorsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/authors/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsImageCreate
     * @request POST:/authors/{id}/image/
     * @secure
     */
    authorsImageCreate: (
      id: string,
      data: {
        /**
         * Image file to upload
         * @format binary
         */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message?: string;
          image_url?: string;
        },
        void
      >({
        path: `/authors/${id}/image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: Login, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersProfileList
     * @request GET:/users/profile/
     * @secure
     */
    usersProfileList: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/profile/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersProfileUpdate
     * @request PUT:/users/profile/
     * @secure
     */
    usersProfileUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/profile/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
