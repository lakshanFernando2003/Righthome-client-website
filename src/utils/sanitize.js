import DOMPurify from 'dompurify';

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return DOMPurify.sanitize(str);
};

export const sanitizeNumber = (num) => {
  if (typeof num !== 'number') return 0;
  return Number(DOMPurify.sanitize(String(num)));
};

export const sanitizeUrl = (url) => {
  if (typeof url !== 'string') return '';
  const sanitized = DOMPurify.sanitize(url);
  return sanitized.startsWith('http') ? sanitized : '';
};
