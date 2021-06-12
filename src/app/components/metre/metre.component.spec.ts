import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MetreComponent } from './metre.component';

describe('MetreComponent', () => {
  let component: MetreComponent;
  let fixture: ComponentFixture<MetreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetreComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MetreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
