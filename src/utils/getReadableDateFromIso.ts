import padWithZero from './padWithZero';

const getReadableDateFromIso = (isoDate: string) => {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = padWithZero(date.getMinutes());
  const seconds = padWithZero(date.getSeconds());
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`
}

export default getReadableDateFromIso;