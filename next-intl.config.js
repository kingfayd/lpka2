import id from './messages/id.json';
import en from './messages/en.json';

const messages = {
  id,
  en,
};

export default async function getRequestConfig({ locale }) {
  // Handle undefined locale by using default
  const validLocale = locale && ['en', 'id'].includes(locale) ? locale : 'id';

  return {
    locale: validLocale,
    messages: messages[validLocale],
  };
}