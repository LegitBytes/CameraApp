/**
 * Extending Error class to produce standard API Erorrs
 */
export class ApiError extends Error {
    public date: Date;
    /**
     * @param {string} message
     */
    constructor(message: string) {
      super(message);
      this.name = 'ApiError';
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ApiError);
      };
      this.date = new Date();
    };
}
