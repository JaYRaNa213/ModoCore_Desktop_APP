import open from 'open';

export const launchTemplate = async ({ apps = [], websites = [] }) => {
  try {
    for (const app of apps) {
      if (app) await open(app); // CLI app name like "code", "notepad"
    }

    for (const url of websites) {
      if (url.startsWith("http"|| "https")) {
        await open(url); // Opens in default browser
      }
    }
  } catch (err) {
    console.error("Launcher error:", err);
    throw new Error("Failed to open apps or websites.");
  }
};
