import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NicknameCreatorComponent } from './nickname-creator.component';

describe('NicknameCreatorComponent', () => {
  let component: NicknameCreatorComponent;
  let fixture: ComponentFixture<NicknameCreatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NicknameCreatorComponent, IonicModule.forRoot()]
    }).compileComponents();
    fixture = TestBed.createComponent(NicknameCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


