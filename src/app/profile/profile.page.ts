import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AvatarModalComponent } from '../avatar-modal/avatar-modal.component';
import { NicknameCreatorComponent } from '../nickname-creator/nickname-creator.component';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProfilePage {
  profile = {
    avatarUrl: 'https://iili.io/KjkZqap.md.png',
    nickname: 'UserNickname',
    fullName: 'Full Name',
    quote: 'A wise quote',
    studentCode: '12345',
    friendsCount: 50,
    classmatesCount: 30
  };

  constructor(
    private modalController: ModalController,
    private avatarService: AvatarService
  ) {
    // Subscribe to avatar URL and nickname changes
    this.avatarService.avatarUrl$.subscribe(url => {
      this.profile.avatarUrl = url;
    });
    this.avatarService.nickname$.subscribe(nickname => {
      this.profile.nickname = nickname;
    });
  }

  async openAvatarModal() {
    const modal = await this.modalController.create({
      component: AvatarModalComponent,
      componentProps: { currentAvatarUrl: this.profile.avatarUrl }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.selectedAvatarUrl) {
        this.avatarService.setAvatarUrl(result.data.selectedAvatarUrl);
      }
    });

    await modal.present();
  }

  async openNicknameModal() {
    const modal = await this.modalController.create({
      component: NicknameCreatorComponent,
      componentProps: { currentNickname: this.profile.nickname }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.selectedNickname) {
        this.avatarService.setNickname(result.data.selectedNickname);
      }
    });

    await modal.present();
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/icon/favicon.png';
  }

  async openHome(){
    window.location.replace('/home');
  }
}


