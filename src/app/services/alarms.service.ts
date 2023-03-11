import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { Alarm } from './alarm.model';

@Injectable({
  providedIn: 'root',
})
export class AlarmsService {
  private readonly ALARM_KEY = 'alarms';

  constructor(private storage: Storage) {}

  getAlarm(): Observable<Alarm[]> {
    return from(this.storage.get(this.ALARM_KEY));
  }

  storeAlarm(alarm: Alarm): Promise<void> {
    return this.storage.get(this.ALARM_KEY).then((alarms: Alarm[]) => {
      if (alarms) {
        alarms.push(alarm);
        return this.storage.set(this.ALARM_KEY, alarms);
      } else {
        return this.storage.set(this.ALARM_KEY, [alarm]);
      }
    });
  }

  deleteAlarm(alarm: Alarm): Promise<void> {
    return this.storage.get(this.ALARM_KEY).then((alarms: Alarm[]) => {
      if (!alarms || alarms.length === 0) {
        return;
      }
      const index = alarms.findIndex((a: Alarm) => a.id === alarm.id);
      alarms.splice(index, 1);
      return this.storage.set(this.ALARM_KEY, alarms);
    });
  }
}
