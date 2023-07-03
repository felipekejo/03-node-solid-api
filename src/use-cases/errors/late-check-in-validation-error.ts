export class LateCheckInValidationError extends Error {
  constructor() {
    super("Check-in is more than 20 minutes old");
  }
}
