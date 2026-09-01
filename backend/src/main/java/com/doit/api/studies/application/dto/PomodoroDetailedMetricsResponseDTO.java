package com.doit.api.studies.application.dto;

public class PomodoroDetailedMetricsResponseDTO {
    
    // Global/Filter metrics
    private long totalSessions;
    private int avgFocusPerDay; // in minutes
    private int avgBreakPerDay; // in minutes
    private int weeksGoalMet;   // Number of weeks the goal was met
    
    // Today metrics for the daily card
    private long todayFocusTime; // in minutes
    
    public PomodoroDetailedMetricsResponseDTO() {}

    public PomodoroDetailedMetricsResponseDTO(long totalSessions, int avgFocusPerDay, int avgBreakPerDay, int weeksGoalMet, long todayFocusTime) {
        this.totalSessions = totalSessions;
        this.avgFocusPerDay = avgFocusPerDay;
        this.avgBreakPerDay = avgBreakPerDay;
        this.weeksGoalMet = weeksGoalMet;
        this.todayFocusTime = todayFocusTime;
    }

    public long getTotalSessions() { return totalSessions; }
    public void setTotalSessions(long totalSessions) { this.totalSessions = totalSessions; }
    
    public int getAvgFocusPerDay() { return avgFocusPerDay; }
    public void setAvgFocusPerDay(int avgFocusPerDay) { this.avgFocusPerDay = avgFocusPerDay; }
    
    public int getAvgBreakPerDay() { return avgBreakPerDay; }
    public void setAvgBreakPerDay(int avgBreakPerDay) { this.avgBreakPerDay = avgBreakPerDay; }
    
    public int getWeeksGoalMet() { return weeksGoalMet; }
    public void setWeeksGoalMet(int weeksGoalMet) { this.weeksGoalMet = weeksGoalMet; }
    
    public long getTodayFocusTime() { return todayFocusTime; }
    public void setTodayFocusTime(long todayFocusTime) { this.todayFocusTime = todayFocusTime; }
}
