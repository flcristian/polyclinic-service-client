import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Schedule} from "../models/schedule.model";
import {CreateScheduleRequest} from "../models/create-schedule-request.model";
import {UpdateScheduleRequest} from "../models/update-schedule-request.model";
import {DatesUtility} from "../../utility/dates.utility";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private server: string = "http://localhost:5275/api/v1/Schedules";

  constructor(private http: HttpClient) {
  }

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.server + "/all")
  }

  getSchedule(doctorId: number, date: Date): Observable<Schedule> {
    let params = new HttpParams().set('year', date.getFullYear()).set('weekNumber', DatesUtility.getWeekNumber(date));
    return this.http.get<Schedule>(this.server + `/schedule/${doctorId}`, {params})
  }

  createSchedule(newSchedule: CreateScheduleRequest): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.server}/create`, newSchedule)
  }

  updateSchedule(updatedSchedule: UpdateScheduleRequest): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.server}/update`, updatedSchedule)
  }

  deleteSchedule(id: number): Observable<Schedule> {
    return this.http.delete<Schedule>(`${this.server}/delete/${id}`)
  }
}
