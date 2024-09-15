export function toDateTime(secs: number | null | undefined) {
  if (secs === null || secs === undefined) {
    return '';
  }

  const t: Date = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t.toISOString();
}
