const DAYS_TO_MILLISECONDS = 24 * 60 * 60 * 1000;

export function addDays(days: number, date: Date): Date {
	const newDateMillis = date.getTime() + DAYS_TO_MILLISECONDS * days;

	return new Date(newDateMillis);
}
