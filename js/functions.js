const calculateMinutes = (separatedTime) => {
  return Number(separatedTime[0]) * 60 + Number(separatedTime[1]);
};

const checkTime = (checkin, checkout, meetingStart, duration) => {
  const separatecheckinTime = checkin.split(':');
  const checkinTime = calculateMinutes(separatecheckinTime);
  const separateMeetingTime = meetingStart.split(':');
  const startTime = calculateMinutes(separateMeetingTime);
  const meetingEnd = startTime + duration;
  const separatecheckoutTime = checkout.split(':');
  const checkoutTime = calculateMinutes(separatecheckoutTime);
  if (meetingEnd <= checkoutTime && startTime >= checkinTime) {
    return true;
  }
  return false;
};

console.log(checkTime('8:00','17:30','17:00',30));
