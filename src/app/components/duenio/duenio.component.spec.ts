import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DuenioComponent } from './duenio.component';

describe('DuenioComponent', () => {
  let component: DuenioComponent;
  let fixture: ComponentFixture<DuenioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuenioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DuenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
