import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  columnTitles = ['Em Alta', 'De Acordo com a Matéria', 'Recomendados'];
  cardColumns = [
    {
      cards: [
        { image: 'https://ionicframework.com/docs/img/demos/card-media.png', title: 'Experience 1', year: '2023', description: 'Description of experience 1.', duration: '2 hours' },
        { image: 'https://ionicframework.com/docs/img/demos/card-media.png', title: 'Experience 2', year: '2022', description: 'Description of experience 2.', duration: '1 hour' },
        { image: 'https://ionicframework.com/docs/img/demos/card-media.png', title: 'Experience 3', year: '2021', description: 'Description of experience 3.', duration: '3 hours' },
        { image: 'https://ionicframework.com/docs/img/demos/card-media.png', title: 'Experience 4', year: '2020', description: 'Description of experience 4.', duration: '1.5 hours' },
      ]
    },
    {
      cards: [
        { image: 'https://ionicframework.com/docs/img/demos/card-media.png', title: 'Experience 5', year: '2019', description: 'Description of experience 5.', duration: '2.5 hours' },
        { image: 'https://ionicframework.com/docs/img/demos/card-media.png', title: 'Experience 6', year: '2018', description: 'Description of experience 6.', duration: '4 hours' },
        { image: 'https://ionicframework.com/docs/img/demos/card-media.png', title: 'Experience 7', year: '2017', description: 'Description of experience 7.', duration: '1 hour' },
      ]
    },
    {
      cards: [
        { image: 'https://ionicframework.com/docs/img/demos/card-media.png', title: 'Experience 8', year: '2016', description: 'Description of experience 8.', duration: '2 hours' },
        { image: 'https://ionicframework.com/docs/img/demos/card-media.png', title: 'Experience 9', year: '2015', description: 'Description of experience 9.', duration: '3 hours' },
        { image: 'https://ionicframework.com/docs/img/demos/card-media.png', title: 'Experience 10', year: '2014', description: 'Description of experience 10.', duration: '2.5 hours' },
      ]
    },
  ];

  avatarUrl: string | undefined;
  nickname: string | undefined;

  constructor(private avatarService: AvatarService, private router: Router) {
    this.avatarService.avatarUrl$.subscribe(url => {
      this.avatarUrl = url;
    });
    this.avatarService.nickname$.subscribe(nickname => {
      this.nickname = nickname;
    });
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  openCamera() {
    this.router.navigateByUrl('/camera');
  }
}
