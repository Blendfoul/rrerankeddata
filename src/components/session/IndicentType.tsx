export function incidentType(type: String, translations: any) {
  switch (type) {
    case 'InvalidLap':
      return translations.incidents.invalidLap;
    case 'LosingControl':
      return translations.incidents.losingControl;
    case 'Track':
      return translations.incidents.trackCollision;
    case 'Vehicle':
      return translations.incidents.vehicleCollision;
    case 'Disconnect':
      return translations.incidents.disconnect;
    case 'NonServedPenalty':
      return translations.incidents.unservedPenalty;
    case 'WrongWay':
      return translations.incidents.wrongWay;
  }
}
