import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { receiversProfilePage } from './receiversProfile.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('receiversProfilePage', () => {
  let comp: receiversProfilePage;
  let fixture: ComponentFixture<receiversProfilePage>;
  let de: DebugElement;
  // let el: HTMLElement;
  let service : AuthService ;
//   comp.openNavBar = true ;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
      ],
      declarations: [
        receiversProfilePage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(receiversProfilePage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(receiversProfilePage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Receiver's Profile'`, () => {
    const fixture = TestBed.createComponent(receiversProfilePage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("Receiver's Profile");
  });

  it("should check label name to be Receiver's Profile", () => {
    let labelName = fixture.debugElement.query(By.css("#receivers-title"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Receiver's Profile");
  });

  it("should check label name to be Add", () => {
    let labelName = fixture.debugElement.query(By.css("#add-receiver-profile"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Add");
  });

  });