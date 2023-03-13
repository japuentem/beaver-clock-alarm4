import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlarmsService } from '../services/alarms.service';
import { Howl } from 'howler';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.page.html',
  styleUrls: ['./clock.page.scss'],
})
export class ClockPage implements OnInit {
  currentDate: string = '';
  currentTime: string = '';
  myStorage: any;
  alarmTime1: string = '';
  alarmTime2: string = '';
  alarmTempStore: string = '';
  isAlarmOn1: boolean = false;
  isAlarmOn2: boolean = false;
  isMuted1: boolean = false;
  isMuted2: boolean = false;
  backgroundColor: string = '';

  private alarmSound = new Howl({
    src: ['../../../assets/sounds/Alarm Clock Alarm.mp3'],
  });

  constructor(
    public alertController: AlertController,
    private storage: Storage,
    private alarmService: AlarmsService
  ) {}

  ngOnInit() {
    this.getColor();
    this.getAlarm();
    this.getCurrentDate();
  }

  getCurrentDate() {
    this.currentDate = new Date().toISOString();
    setInterval(() => {
      this.currentTime = new Date().toISOString();
      this.checkAlarm();
    }, 1000);
  }

  // Función para inicializar el almacenamiento local
  async init() {
    const storage = await this.storage.create();
    this.myStorage = storage;
  }

  // Función para mostrar la alarma guardada localmente
  async getAlarm() {
    this.init();
    this.alarmTime1 = await this.storage.get('alarm1');
    this.alarmTime2 = await this.storage.get('alarm2');
  }

  // Función para borrar la alarma guardada localmente
  async deleteAlarm(alarm: number) {
    await this.storage.remove('alarm' + alarm);
    this.getAlarm();
  }

  // Funcion para mostrar el color guardado localmente
  async getColor() {
    this.init();
    this.backgroundColor = await this.storage.get('color');
  }

  muteAlarm(alarm: number) {
    // this.alarmSound.mute();
    if (alarm == 1) {
      this.alarmSound.mute();
      this.isMuted1 = true;
    } else {
      this.alarmSound.mute();
      this.isMuted2 = true;
    }
  }

  unmuteAlarm(alarm: number) {
    // this.alarmSound.mute(false);
    if (alarm == 1) {
      this.alarmSound.mute(false);
      this.isMuted1 = false;
    } else {
      this.alarmSound.mute(false);
      this.isMuted2 = false;
    }
  }

  async showControlerAlarm(alarm: number) {
    const alert = await this.alertController.create({
      header: 'Seleccionar hora',
      inputs: [
        {
          name: 'time',
          type: 'time',
          label: 'Hora',
          value: '09:00',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.alarmTempStore = data.time;
            this.init();
            this.storage.set('alarm' + alarm, data.time);
            this.getAlarm();
          },
        },
      ],
    });
    await alert.present();
  }

  async showControlerColor() {
    const alert = await this.alertController.create({
      header: 'Select a color',
      inputs: [
        {
          name: 'color',
          type: 'radio',
          label: 'Old Rose',
          value: '#C38778',
          checked: this.backgroundColor === '#C38778',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Brown',
          value: '#784132',
          checked: this.backgroundColor === '#784132',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Light Blue',
          value: '#A3D4FF',
          checked: this.backgroundColor === '#A3D4FF',
        },

        /*         {
          name: 'color',
          type: 'radio',
          label: 'Celestial Blue',
          value: '#4d9de0',
          checked: this.backgroundColor === '#4d9de0',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Indian Red',
          value: '#e15554',
          checked: this.backgroundColor === '#e15554',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Saffron',
          value: '#e1bc29',
          checked: this.backgroundColor === '#e1bc29',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Cerulean',
          value: '#007ea7',
          checked: this.backgroundColor === '#007ea7',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Picton Blue',
          value: '#00a8e8',
          checked: this.backgroundColor === '#00a8e8',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Jade',
          value: '#3bb273',
          checked: this.backgroundColor === '#3bb273',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Royal Purple',
          value: '#7768ae',
          checked: this.backgroundColor === '#7768ae',
        }, */
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (event) => {
            this.backgroundColor = event;
            // Agregar el color al almacenamiento local
            this.init();

            this.storage.set('color', this.backgroundColor);
          },
        },
      ],
    });

    await alert.present();
  }

  // Funcion para revisar cada segundo si la hora actual es igual a alguna de las alarmas almacenadas
  async checkAlarm() {
    console.log('Checking alarm');

    const now = new Date();
    const currentHourMinute = now.getHours() + now.getMinutes();

    this.init();
    const alarm1check1 = await this.storage.get('alarm1');
    const alarm1check2 = await this.storage.get('alarm2');

    if (
      currentHourMinute === alarm1check1 &&
      !this.isMuted1 &&
      !this.isAlarmOn1
    ) {
      this.alarmSound.play();
      this.isAlarmOn1 = true;
      console.log('suena alarma 1');
    }

    if (
      currentHourMinute === alarm1check2 &&
      !this.isMuted2 &&
      !this.isAlarmOn2
    ) {
      this.alarmSound.play();
      this.isAlarmOn2 = true;
      console.log('suena alarma 2');
    }
  }
}
