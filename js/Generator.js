class Generator {
  static generateOptionElementForSelect(content, id, select) {
    let option = document.createElement('option');
    option.id = id;
    option.innerHTML = content;
    select.appendChild(option)
  }

  static generateScheduleResult(schedule, list) {
    let result = document.createElement('li')
    const minutes = parseInt(schedule.message.split(" ")[0]);
    if (isNaN(minutes)) {
      result.innerHTML = schedule.message
    } else {
      result.innerHTML = `Un train en direction de ${schedule.destination} arrive dans ${schedule.message} (${this.formatTime(this.getCurrentTimePlusMinutes(minutes))})`
    }
    list.appendChild(result)
  }

  static generateAverageWaitingTime(schedules, list) {
    const minutes = schedules.map(schedule => parseInt(schedule.message.split(" ")[0])).filter(x => !isNaN(x));
    let waitingTimers = [];
    minutes.reverse().forEach((minute, index) => {
      if (index < minutes.length - 1) {
        waitingTimers.push(minutes[index] - minutes[index+1])
      }
    })
    const waitingTimesSum = waitingTimers.reduce((a, b) => a + b, 0)
    list.innerHTML = `Le temps d'attente moyen est de ${Math.round(waitingTimesSum / waitingTimers.length)} minutes.`
  }

  static showTrafficInfo(message, element) {
    let paragraph = document.createElement('p');
    paragraph.innerHTML = message;
    element.appendChild(paragraph);
  }

  static getCurrentTimePlusMinutes(minutes) {
    return new Date(new Date().getTime() + minutes*60000);
  }

  static formatTime(date) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
}