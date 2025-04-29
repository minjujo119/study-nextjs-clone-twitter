// N일 전, 1일 미만이면 'N시간 전'으로 포맷팅
export const sinceWhenFormat = (createdTime: Date) => {
  const formatter = new Intl.RelativeTimeFormat("ko");
  const dayInMs = 1000 * 60 * 60 * 24;
  const hourInMs = 3600000;
  const time = new Date(createdTime).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);
  if (diff === 0) {
    const diff = Math.round((time - now) / hourInMs);
    return formatter.format(diff, "hours");
  }
  return formatter.format(diff, "days");
};

// YYYY-MM-DD HH:MM:SS 포맷팅
export const formatedTimestamp = (createdTime: Date) => {
  const d = new Date(createdTime);
  const date = d.toISOString().split("T")[0];
  const time = d.toTimeString().split(" ")[0];
  return `${date} ${time}`;
};
