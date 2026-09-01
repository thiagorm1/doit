import { API_BASE_URL } from '../../shared/config';

type PomodoroMode = 'focus' | 'short' | 'long' | 'done';

export interface PomodoroState {
  focusMin: number;
  shortMin: number;
  longMin: number;
  totalCycles: number;

  mode: PomodoroMode;
  currentCycle: number;
  timeLeft: number;
  isRunning: boolean;
}

type Subscriber = (state: PomodoroState) => void;

class PomodoroService {
  private state: PomodoroState = {
    focusMin: 25,
    shortMin: 5,
    longMin: 15,
    totalCycles: 4,
    mode: 'focus',
    currentCycle: 1,
    timeLeft: 25 * 60,
    isRunning: false,
  };

  private intervalId: any = null;
  private subscribers: Set<Subscriber> = new Set();

  public subscribe(sub: Subscriber) {
    this.subscribers.add(sub);
    sub(this.state); // immediate notify
    return () => this.subscribers.delete(sub);
  }

  private notify() {
    this.subscribers.forEach(sub => sub(this.state));
  }

  public getState() {
    return this.state;
  }

  public getTotalTimeForMode() {
    if (this.state.mode === 'focus') return this.state.focusMin * 60;
    if (this.state.mode === 'short') return this.state.shortMin * 60;
    return this.state.longMin * 60;
  }

  public setConfig(focusMin: number, shortMin: number, longMin: number, totalCycles: number) {
    this.state.focusMin = focusMin;
    this.state.shortMin = shortMin;
    this.state.longMin = longMin;
    this.state.totalCycles = totalCycles;
    
    this.reset();
  }

  public togglePlay() {
    this.state.isRunning = !this.state.isRunning;
    if (this.state.isRunning) {
      this.intervalId = setInterval(() => this.tick(), 1000);
    } else {
      clearInterval(this.intervalId);
    }
    this.notify();
  }

  public reset() {
    this.state.isRunning = false;
    clearInterval(this.intervalId);
    this.state.mode = 'focus';
    this.state.currentCycle = 1;
    this.state.timeLeft = this.state.focusMin * 60;
    this.notify();
  }
  
  public resetCurrent() {
    this.state.isRunning = false;
    clearInterval(this.intervalId);
    this.state.timeLeft = this.getTotalTimeForMode();
    this.notify();
  }

  public skip() {
    this.state.isRunning = false;
    clearInterval(this.intervalId);
    this.nextPhase();
  }

  private nextPhase() {
    if (this.state.mode === 'focus') {
      if (this.state.currentCycle >= this.state.totalCycles) {
        this.state.mode = 'done';
        this.state.timeLeft = 0;
        this.state.isRunning = false;
        clearInterval(this.intervalId);
      } else {
        this.state.mode = 'short';
        this.state.timeLeft = this.state.shortMin * 60;
      }
    } else {
      this.state.currentCycle++;
      this.state.mode = 'focus';
      this.state.timeLeft = this.state.focusMin * 60;
    }
    this.notify();
  }

  private tick() {
    if (this.state.timeLeft > 0) {
      this.state.timeLeft--;
      this.notify();
    } else {
      this.nextPhase();
    }
  }

  public async completePomodoro() {
    try {
      await fetch(`${API_BASE_URL}/api/studies/pomodoro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          focusTime: this.state.focusMin,
          shortBreak: this.state.shortMin,
          longBreak: this.state.longMin,
          cycles: this.state.totalCycles
        })
      });
      window.dispatchEvent(new Event('pomodoro-completed'));
    } catch (err) {
      console.error('Failed to save session', err);
    }
    this.reset();
  }
}

export const pomodoroGlobal = new PomodoroService();
