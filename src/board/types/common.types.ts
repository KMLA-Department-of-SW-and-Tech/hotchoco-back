export interface PaginationDto {
  page?: number;
  limit?: number;
}

export interface PaginatedResponseHeaders {
  'X-Total-Count': number;
  'X-Page': number;
  'X-Limit': number;
  'X-Total-Pages': number;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
}

export interface ValidationErrorDetail {
  field: string;
  error: string;
  value?: unknown;
}

export interface ValidationErrorResponse extends ErrorResponse {
  details: {
    validationErrors: ValidationErrorDetail[];
  };
}
