import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

interface Avatar {
  name: string;
  url: string;
}

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar-modal.component.html',
  styleUrls: ['./avatar-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AvatarModalComponent {
  @Input() currentAvatarUrl: string | undefined;

  avatars = {
    default: [{ name: 'Default Avatar', url: 'https://iili.io/KjkZqap.md.png' }],
    anime: [
      { name: 'Anime Girl', url: 'https://iili.io/KjkOiQ9.png' },
      { name: 'Anime Boy', url: 'https://iili.io/KjkPtee.png' }
    ]
  };

  selectedAvatar: Avatar | null = null;

  constructor(private modalController: ModalController) {}

  selectAvatar(avatar: Avatar) {
    this.selectedAvatar = avatar;
  }

  confirm() {
    if (this.selectedAvatar) {
      this.modalController.dismiss({ selectedAvatarUrl: this.selectedAvatar.url });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}


