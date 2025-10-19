// Centralized logging utility for consistent error handling and debugging

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: number;
  source?: string;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = LogLevel.INFO;
  private logs: LogEntry[] = [];
  private maxLogs: number = 100;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  private log(level: LogLevel, message: string, data?: any, source?: string): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: Date.now(),
      source
    };

    this.logs.push(entry);
    
    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output with appropriate styling
    const timestamp = new Date(entry.timestamp).toISOString();
    const sourceStr = source ? `[${source}]` : '';
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`🐛 ${timestamp} ${sourceStr} ${message}`, data);
        break;
      case LogLevel.INFO:
        console.info(`ℹ️ ${timestamp} ${sourceStr} ${message}`, data);
        break;
      case LogLevel.WARN:
        console.warn(`⚠️ ${timestamp} ${sourceStr} ${message}`, data);
        break;
      case LogLevel.ERROR:
        console.error(`❌ ${timestamp} ${sourceStr} ${message}`, data);
        break;
    }
  }

  debug(message: string, data?: any, source?: string): void {
    this.log(LogLevel.DEBUG, message, data, source);
  }

  info(message: string, data?: any, source?: string): void {
    this.log(LogLevel.INFO, message, data, source);
  }

  warn(message: string, data?: any, source?: string): void {
    this.log(LogLevel.WARN, message, data, source);
  }

  error(message: string, data?: any, source?: string): void {
    this.log(LogLevel.ERROR, message, data, source);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Convenience functions for common use cases
export const logOutfitGeneration = (message: string, data?: any) => {
  logger.info(message, data, 'OutfitGeneration');
};

export const logRateLimit = (message: string, data?: any) => {
  logger.warn(message, data, 'RateLimit');
};

export const logImageProcessing = (message: string, data?: any) => {
  logger.debug(message, data, 'ImageProcessing');
};

export const logError = (message: string, error?: any, source?: string) => {
  logger.error(message, error, source);
};
