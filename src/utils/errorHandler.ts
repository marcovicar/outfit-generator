// Centralized error handling utilities

import { logger } from './logger';

export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

export class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  handleError(error: unknown, context?: string): AppError {
    const timestamp = Date.now();
    
    let appError: AppError;
    
    if (error instanceof Error) {
      appError = {
        code: 'GENERIC_ERROR',
        message: error.message,
        details: {
          stack: error.stack,
          name: error.name
        },
        timestamp
      };
    } else if (typeof error === 'string') {
      appError = {
        code: 'STRING_ERROR',
        message: error,
        timestamp
      };
    } else {
      appError = {
        code: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred',
        details: error,
        timestamp
      };
    }

    // Log the error
    logger.error(`Error in ${context || 'unknown context'}`, appError, context);

    return appError;
  }

  handleApiError(error: any, context: string = 'API'): AppError {
    const timestamp = Date.now();
    
    let appError: AppError;
    
    if (error?.response?.status) {
      appError = {
        code: `API_ERROR_${error.response.status}`,
        message: error.response.data?.message || `API request failed with status ${error.response.status}`,
        details: {
          status: error.response.status,
          data: error.response.data,
          url: error.config?.url
        },
        timestamp
      };
    } else if (error?.code) {
      appError = {
        code: `API_ERROR_${error.code}`,
        message: error.message || 'API request failed',
        details: error,
        timestamp
      };
    } else {
      appError = this.handleError(error, context);
    }

    logger.error(`API error in ${context}`, appError, context);
    return appError;
  }

  handleImageError(error: unknown, imageUrl: string): AppError {
    const timestamp = Date.now();
    
    const appError: AppError = {
      code: 'IMAGE_LOAD_ERROR',
      message: `Failed to load image: ${imageUrl}`,
      details: {
        imageUrl,
        originalError: error
      },
      timestamp
    };

    logger.error('Image load error', appError, 'ImageLoading');
    return appError;
  }

  handleRateLimitError(reason: string, waitTime?: number): AppError {
    const timestamp = Date.now();
    
    const appError: AppError = {
      code: 'RATE_LIMIT_ERROR',
      message: reason,
      details: {
        waitTime,
        retryAfter: waitTime ? new Date(timestamp + waitTime).toISOString() : undefined
      },
      timestamp
    };

    logger.warn('Rate limit exceeded', appError, 'RateLimit');
    return appError;
  }

  // Utility function to safely execute async operations
  async safeExecute<T>(
    operation: () => Promise<T>,
    context: string,
    fallback?: T
  ): Promise<T | undefined> {
    try {
      return await operation();
    } catch (error) {
      this.handleError(error, context);
      return fallback;
    }
  }

  // Utility function to safely execute sync operations
  safeExecuteSync<T>(
    operation: () => T,
    context: string,
    fallback?: T
  ): T | undefined {
    try {
      return operation();
    } catch (error) {
      this.handleError(error, context);
      return fallback;
    }
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Convenience functions
export const handleError = (error: unknown, context?: string) => 
  errorHandler.handleError(error, context);

export const handleApiError = (error: any, context?: string) => 
  errorHandler.handleApiError(error, context);

export const handleImageError = (error: unknown, imageUrl: string) => 
  errorHandler.handleImageError(error, imageUrl);

export const handleRateLimitError = (reason: string, waitTime?: number) => 
  errorHandler.handleRateLimitError(reason, waitTime);
