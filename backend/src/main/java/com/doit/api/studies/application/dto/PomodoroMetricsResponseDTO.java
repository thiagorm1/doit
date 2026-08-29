package com.doit.api.studies.application.dto;

public class PomodoroMetricsResponseDTO {
    private long totalSessions;
    private int averageFocusTimePerDay;
    private int averageBreakTimePerDay;

    public PomodoroMetricsResponseDTO(long totalSessions, int averageFocusTimePerDay, int averageBreakTimePerDay) {
        this.totalSessions = totalSessions;
        this.averageFocusTimePerDay = averageFocusTimePerDay;
        this.averageBreakTimePerDay = averageBreakTimePerDay;
    }

    public long getTotalSessions() {
        return totalSessions;
    }

    public void setTotalSessions(long totalSessions) {
        this.totalSessions = totalSessions;
    }

    public int getAverageFocusTimePerDay() {
        return averageFocusTimePerDay;
    }

    public void setAverageFocusTimePerDay(int averageFocusTimePerDay) {
        this.averageFocusTimePerDay = averageFocusTimePerDay;
    }

    public int getAverageBreakTimePerDay() {
        return averageBreakTimePerDay;
    }

    public void setAverageBreakTimePerDay(int averageBreakTimePerDay) {
        this.averageBreakTimePerDay = averageBreakTimePerDay;
    }
}
