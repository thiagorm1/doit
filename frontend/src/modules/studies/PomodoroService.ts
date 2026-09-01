import { API_BASE_URL } from '../../shared/config';

type PomodoroMode = 'focus' | 'short' | 'long' | 'done';

export interface PomodoroState {
  focusMin: number;
  shortMin: number;
  longMin: number;
  totalCycles: number; // Used as 'cycles before long break'
  longBreakEnabled: boolean;

  mode: PomodoroMode;
  currentCycle: number; // 1 to totalCycles
  completedCycles: number; // Total focus cycles completed in this session
  timeLeft: number;
  isRunning: boolean;
}

type Subscriber = (state: PomodoroState) => void;

class PomodoroService {
  private state: PomodoroState = {
    focusMin: parseInt(localStorage.getItem('doit_pomo_focus') || '25'),
    shortMin: parseInt(localStorage.getItem('doit_pomo_short') || '5'),
    longMin: parseInt(localStorage.getItem('doit_pomo_long') || '15'),
    totalCycles: parseInt(localStorage.getItem('doit_pomo_cycles') || '4'),
    longBreakEnabled: localStorage.getItem('doit_pomo_long_enabled') === 'true',
    mode: 'focus',
    currentCycle: 1,
    completedCycles: 0,
    timeLeft: parseInt(localStorage.getItem('doit_pomo_focus') || '25') * 60,
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

  public setConfig(focusMin: number, shortMin: number, longMin: number, totalCycles: number, longBreakEnabled: boolean = false) {
    this.state.focusMin = focusMin;
    this.state.shortMin = shortMin;
    this.state.longMin = longMin;
    this.state.totalCycles = totalCycles;
    this.state.longBreakEnabled = longBreakEnabled;
    
    localStorage.setItem('doit_pomo_focus', focusMin.toString());
    localStorage.setItem('doit_pomo_short', shortMin.toString());
    localStorage.setItem('doit_pomo_long', longMin.toString());
    localStorage.setItem('doit_pomo_cycles', totalCycles.toString());
    localStorage.setItem('doit_pomo_long_enabled', longBreakEnabled ? 'true' : 'false');
    
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
      // Are we at the end of the entire Pomodoro?
      if (this.state.currentCycle >= this.state.totalCycles) {
        if (this.state.longBreakEnabled) {
          this.state.mode = 'long';
          this.state.timeLeft = this.state.longMin * 60;
        } else {
          this.state.mode = 'done';
          this.state.timeLeft = 0;
          this.state.isRunning = false;
          clearInterval(this.intervalId);
        }
      } else {
        // Not at the end. Should we take a long break? (Every 2 cycles)
        if (this.state.longBreakEnabled && this.state.currentCycle % 2 === 0) {
          this.state.mode = 'long';
          this.state.timeLeft = this.state.longMin * 60;
        } else {
          this.state.mode = 'short';
          this.state.timeLeft = this.state.shortMin * 60;
        }
      }
    } else if (this.state.mode === 'short' || this.state.mode === 'long') {
      // If we just finished the final long break (at the end of totalCycles), we are done
      if (this.state.currentCycle >= this.state.totalCycles) {
        this.state.mode = 'done';
        this.state.timeLeft = 0;
        this.state.isRunning = false;
        clearInterval(this.intervalId);
      } else {
        this.state.currentCycle++;
        this.state.mode = 'focus';
        this.state.timeLeft = this.state.focusMin * 60;
      }
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
