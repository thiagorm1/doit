package com.doit.api.studies.application.dto;

public class PomodoroSessionRequestDTO {
    private int focusTime;
    private int shortBreak;
    private int longBreak;
    private int cycles;

    public int getFocusTime() {
        return focusTime;
    }

    public void setFocusTime(int focusTime) {
        this.focusTime = focusTime;
    }

    public int getShortBreak() {
        return shortBreak;
    }

    public void setShortBreak(int shortBreak) {
        this.shortBreak = shortBreak;
    }

    public int getLongBreak() {
        return longBreak;
    }

    public void setLongBreak(int longBreak) {
        this.longBreak = longBreak;
    }

    public int getCycles() {
        return cycles;
    }

    public void setCycles(int cycles) {
        this.cycles = cycles;
    }
}
