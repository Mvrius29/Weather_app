import { CONFIG } from "./config.js"

export class Logger {
  constructor(config = {}) {
    // Inițializează array-ul de log-uri
    // Verifică configurația
    this.logs=[]
    this.config={
        level: config.level || 'info',
        storeLogs: config.storeLogs  !== undefined ? false : true,
    }
  }

  // Metodă privată pentru formatarea log-urilor
  _log(level, message, data) {
    // Formatează: [TIMESTAMP] [LEVEL] message
    // Adaugă în array
    // Limitează numărul de log-uri

    const levels = { debug: 0, info: 1, warn: 2, error: 3 }
    const currentLevel = levels[CONFIG.LOGGING.LEVEL]
    const messageLevel = levels[level]
       if(currentLevel > messageLevel)
         return
    
    
    const timestamp = new Date().toISOString();
      const logEntry = {
      timestamp,
      level,
      message,
      data,
    };
    if (this.logs.length >= CONFIG.LOGGING.MAX_LOGS) {
         this.logs.shift() 
    }
   
    if (this.config.storeLogs) {
      this.logs.push(logEntry);
    }

    switch (level) {
      case 'error':
        console.error(`[${timestamp}] [ERROR] ${message}`, data);
        break;
      case 'warn':
        console.warn(`[${timestamp}] [WARN] ${message}`, data);
        break;
      case 'info':
        console.info(`[${timestamp}] [INFO] ${message}`, data);
        break;
      case 'debug':
        console.debug(`[${timestamp}] [DEBUG] ${message}`, data);
        break;
      default:
        console.log(`[${timestamp}] [LOG] ${message}`, data);
    }
  }

  debug(message, data = null) {
    this._log('debug', message, data);
  }

  info(message, data = null) {
    this._log('info', message, data);
  }

  warn(message, data = null) {
    this._log('warn', message, data);
  }

  error(message, error = null) {
    this._log('error', message, error);
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  show() {
    console.group('Logger output');
    this.logs.forEach(log => {
      const { timestamp, level, message, data } = log;
      switch (level) {
        case 'error':
          console.error(`[${timestamp}] [ERROR] ${message}`, data);
          break;
        case 'warn':
          console.warn(`[${timestamp}] [WARN] ${message}`, data);
          break;
        case 'info':
          console.info(`[${timestamp}] [INFO] ${message}`, data);
          break;
        case 'debug':
          console.debug(`[${timestamp}] [DEBUG] ${message}`, data);
          break;
        default:
          console.log(`[${timestamp}] [LOG] ${message}`, data);
      }
    });
    console.groupEnd();
  }
}


// Exportă o instanță unică (Singleton pattern)
export const logger = new Logger()

// Expune logger-ul global pentru debugging
window.logs = {
  show: () => logger.show(),
  clear: () => logger.clearLogs(),
  get: () => logger.getLogs(),
}