const selectLines = document.querySelector('#lines');
const selectDestination = document.querySelector('#directions');
const selectStations = document.querySelector('#stations');
const getSchedulesButton = document.querySelector('#getSchedules');
const schedulesList = document.querySelector('#schedules');
const trafficInfoParagraph = document.querySelector('#trafficInfo');
const averageWaitingTimeParagraph = document.querySelector('#averageWaitingTime');

const REFRESH_RATE = 30000; // Milliseconds

MetroRepository.getLines().then(lines => {
  const metroLines = lines.result.metros;
  metroLines.forEach(line => {
    Generator.generateOptionElementForSelect(line.name, line.code, selectLines)
  })
})

selectLines.addEventListener("change", () => {
  const value = selectLines.value;
  const id = Array.from(selectLines.childNodes).filter(node => node.innerHTML == value)[0].id
  MetroRepository.getDestinationsForLine(id).then(destinations => {
    selectDestination.innerHTML = "";
    destinations = destinations.result.destinations;
    destinations.forEach(destination => {
      Generator.generateOptionElementForSelect(destination.name, destination.way, selectDestination)
    })
  })
  MetroRepository.getStationsForLine(id).then(stations => {
    selectStations.innerHTML = "";
    stations = stations.result.stations;
    stations.forEach(station => {
      Generator.generateOptionElementForSelect(station.name, station.slug, selectStations)
    })
  })
})

let interval;

getSchedulesButton.addEventListener('click', () => {
  getTrainsData()
  clearInterval(interval);
  interval = setInterval(getTrainsData, REFRESH_RATE)
})

function getTrainsData() {
  schedulesList.innerHTML = "";
  trafficInfoParagraph.innerHTML = "";
  const lineCode = Array.from(selectLines.childNodes).filter(node => node.innerHTML == selectLines.value)[0].id;
  const destinationWay = Array.from(selectDestination.childNodes).filter(node => node.innerHTML == selectDestination.value)[0].id;
  const station = Array.from(selectStations.childNodes).filter(node => node.innerHTML == selectStations.value)[0].id;
  MetroRepository.getSchedule(lineCode, station, destinationWay).then(schedules => {
    schedules = schedules.result.schedules;
    schedules.forEach(schedule => {
      Generator.generateScheduleResult(schedule, schedulesList)
    })
    Generator.generateAverageWaitingTime(schedules, averageWaitingTimeParagraph)
  })
  MetroRepository.getTrafficForLine(lineCode).then(traffic => {
    traffic = traffic.result
    Generator.showTrafficInfo(traffic.message, trafficInfoParagraph)
  })
}
