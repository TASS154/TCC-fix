import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nickname-modal',
  templateUrl: './nickname-creator.component.html',
  styleUrls: ['./nickname-creator.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NicknameCreatorComponent {
  @Input() currentNickname: string = '';
  names: string[] = ['Albert', 'Leonardo', 'Napoleão', 'Sherlock', 'Marie', 'Joana'];
  surnames: string[] = ['Einstein', 'Da Vinci', 'Bonaparte', 'Holmes', 'Curie', "D'arc"];
  selectedName: string;
  selectedSurname: string;
  nameIndex: number = 0;
  surnameIndex: number = 0;

  constructor(private modalController: ModalController) {
    if (this.currentNickname) {
      const [name, surname] = this.currentNickname.split(' ');
      this.selectedName = name || this.names[0];
      this.selectedSurname = surname || this.surnames[0];
      this.nameIndex = this.names.indexOf(this.selectedName) !== -1 ? this.names.indexOf(this.selectedName) : 0;
      this.surnameIndex = this.surnames.indexOf(this.selectedSurname) !== -1 ? this.surnames.indexOf(this.selectedSurname) : 0;
    } else {
      this.selectedName = this.names[0];
      this.selectedSurname = this.surnames[0];
    }
  }

  cycleName(direction: 'up' | 'down') {
    if (direction === 'up') {
      this.nameIndex = (this.nameIndex + 1) % this.names.length;
    } else {
      this.nameIndex = (this.nameIndex - 1 + this.names.length) % this.names.length;
    }
    this.selectedName = this.names[this.nameIndex];
  }

  cycleSurname(direction: 'up' | 'down') {
    if (direction === 'up') {
      this.surnameIndex = (this.surnameIndex + 1) % this.surnames.length;
    } else {
      this.surnameIndex = (this.surnameIndex - 1 + this.surnames.length) % this.surnames.length;
    }
    this.selectedSurname = this.surnames[this.surnameIndex];
  }

  async saveNickname() {
    const newNickname = `${this.selectedName} ${this.selectedSurname}`;
    await this.modalController.dismiss({
      selectedNickname: newNickname
    });
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  RandomNickname() {
    this.nameIndex = Math.floor(Math.random() * this.names.length);
    this.surnameIndex = Math.floor(Math.random() * this.surnames.length);
    this.selectedName = this.names[this.nameIndex];
    this.selectedSurname = this.surnames[this.surnameIndex];
  }
}


