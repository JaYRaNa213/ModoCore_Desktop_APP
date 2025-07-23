// utils/logger.js
export const log = (message) => {
  console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
};
