const GUEST_KEY = "guest-templates";

export const getGuestTemplates = () => {
  const raw = localStorage.getItem(GUEST_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveGuestTemplates = (templates) => {
  localStorage.setItem(GUEST_KEY, JSON.stringify(templates));
};

export const addGuestTemplate = (template) => {
  const all = getGuestTemplates();
  template.createdAt = new Date().toISOString();
  saveGuestTemplates([...all, template]);
};

export const purgeOldGuestTemplates = () => {
  const now = Date.now();
  const valid = getGuestTemplates().filter(t =>
    now - new Date(t.createdAt).getTime() < 3 * 24 * 60 * 60 * 1000
  );
  saveGuestTemplates(valid);
  return valid;
};
