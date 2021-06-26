import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncuestaComponent } from './encuesta.component';

describe('EncuestaComponent', () => {
  let component: EncuestaComponent;
  let fixture: ComponentFixture<EncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
