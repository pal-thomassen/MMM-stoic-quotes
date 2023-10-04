function runAtTime(func, targetHour) {
  const now = new Date()
  const delay = calculateRunningTime(now, targetHour)
  setTimeout(() => {
    func()
    runAtTime(func, targetHour)
  }, delay)
}

function calculateRunningTime(now, targetHour) {
  const targetHourInt = parseInt(targetHour)

  if (targetHourInt < 0 || targetHourInt > 23) {
    throw new Error("targetHour must be between 0 and 23")
  }
  const targetTime = new Date(now)
  targetTime.setHours(targetHourInt, 0, 0, 0) // Setting the target time for today

  // If the target time is in the past (today), set it for tomorrow
  if (now > targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  return targetTime - now
}
function parseSize(size) {
  switch (size) {
    case 'xsmall':
      return "xsmall";
    case 'small':
      return "small";
    case 'medium':
      return "medium";
    case 'large':
      return "large";
    case "xlarge":
      return "xlarge"
    default:
      return "medium"
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateRunningTime,
    parseSize
  }
}

