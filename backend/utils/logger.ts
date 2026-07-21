class Logger {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public log(message: string) {
    process.stdout.write(`[${this.name}]: ${message}\n`);
  }
}
export default Logger;
