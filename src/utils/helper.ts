import { TrackType } from '@/sharedTypes/sharedTypes';

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;
  return `${minutes}:${outputSeconds}`;
}

export function getTimePanel(
  currentTime: number,
  totalTime: number | undefined,
): string {
  if (!totalTime || totalTime <= 0) {
    return formatTime(currentTime);
  }

  return `${formatTime(currentTime)}/${formatTime(totalTime)}`;
}

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v != null) {
          uniqueValues.add(String(v));
        }
      });
    } else if (value != null) {
      uniqueValues.add(String(value));
    }
  });

  return Array.from(uniqueValues);
}
