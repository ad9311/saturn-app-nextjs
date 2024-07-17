export function compareMonthYear(month: string | number, year: string | number) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  if (currentMonth === Number(month) && currentYear ===  Number(year)) {
    return true;
  }

  return false;
}
