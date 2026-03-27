const semesterNames: Record<string, string> = {
  "1": "Winter",
  "5": "Summer",
  "9": "Fall",
};

const monthFormatter = new Intl.DateTimeFormat("en-CA", {
  month: "long",
  timeZone: "UTC",
});

export function formatSemesterCode(semester: string) {
  const year = semester.slice(0, 4);
  const monthCode = semester.slice(4);

  if (year.length !== 4 || monthCode.length !== 1) {
    return semester;
  }

  const namedSemester = semesterNames[monthCode];

  if (namedSemester) {
    return `${namedSemester} ${year}`;
  }

  const monthNumber = Number(monthCode);

  if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return semester;
  }

  const date = new Date(Date.UTC(Number(year), monthNumber - 1, 1));
  const monthName = monthFormatter.format(date);

  return `${monthName} ${year}`;
}
