export function formatDate(isoDate) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!day) return `${month}/${year}`; // support yyyy-mm for month
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}
