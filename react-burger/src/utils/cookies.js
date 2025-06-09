export const setCookie = (name, value, days = 1) => {
  const expires = new Date(Date.now() + days * 86400e3).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name) => {
  setCookie(name, '', -1);
};