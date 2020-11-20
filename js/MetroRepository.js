class MetroRepository {
  static async getStationsForLine(lineCode) {
    return await fetch('https://api-ratp.pierre-grimaud.fr/v4/stations/metros/' + lineCode).then(res => res.json())
  }

  static async getLines() {
    return await fetch('https://api-ratp.pierre-grimaud.fr/v4/lines').then(res => res.json())
  }

  static async getDestinationsForLine(lineCode) {
    return await fetch('https://api-ratp.pierre-grimaud.fr/v4/destinations/metros/' + lineCode).then(res => res.json())
  }

  static async getSchedule(lineCode, station, way) {
    return await fetch(`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${lineCode}/${station}/${way}`).then(res => res.json())
  }

  static async getTrafficForLine(lineCode) {
    return await fetch(`https://api-ratp.pierre-grimaud.fr/v4/traffic/metros/${lineCode}`).then(res => res.json())
  }
}
