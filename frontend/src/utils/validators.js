// ✅ src/utils/validators.js
export const isValidApp = (app) => app.trim().length > 0;
export const isValidUrl = (url) => /^(https?:\/\/)/i.test(url);
export const isValidCron = (cron) => {
  const parts = cron.trim().split(" ");
  return parts.length === 5;
};