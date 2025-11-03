import { Component, OnInit  } from '@angular/core';
import { Camera, CameraResultType, CameraSource, PermissionStatus } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor() {}

  async ngOnInit() {

    await this.requestCameraPermission();

  }



  async requestCameraPermission() {

    try {

      const permission: PermissionStatus = await Camera.requestPermissions({ permissions: ['camera'] });



      if (permission.camera === 'granted') {

        console.log('Permissão para câmera concedida');



      } else if (permission.camera === 'denied') {

        console.log('Permissão para câmera negada');



      } else if (permission.camera === 'prompt') {

        console.log('Aguardando decisão do usuário sobre permissão da câmera');

      }

    } catch (error) {

      console.error('Erro ao solicitar permissão da câmera:', error);

    }

  }


}
