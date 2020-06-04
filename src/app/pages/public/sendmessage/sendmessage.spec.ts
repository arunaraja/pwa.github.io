import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { sendmessagePage } from './sendmessage.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('sendmessagePage', () => {
  let comp: sendmessagePage;
  let fixture: ComponentFixture<sendmessagePage>;
  let de: DebugElement;
  let el: HTMLElement;
  let service : AuthService ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
      ],
      declarations: [
        sendmessagePage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(sendmessagePage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(sendmessagePage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Send Message'`, () => {
    const fixture = TestBed.createComponent(sendmessagePage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Send Message');
  });

  it('should check label name to be Send Message', () => {
    let labelName = fixture.debugElement.query(By.css("#send-message-title"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Send Message');
  });

  // it('should check button name to be History', () => {
  //   let labelName = fixture.debugElement.query(By.css("#btnForHsitory"));
  //   expect(labelName.nativeElement.textContent.trim()).toBe('History');
  // });

  it('should check button name to be Send Message', () => {
    let labelName = fixture.debugElement.query(By.css("#sendMsgBtn"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Send Message');
  });

  it('should check label name to be To', () => {
    let labelName = fixture.debugElement.query(By.css("#toName"));
    expect(labelName.nativeElement.textContent.trim()).toBe('To');
  });

  it('check message content length should not be greater than 500', () => {
    const divDescription = fixture.debugElement.query(By.css('#msgContent'));
    divDescription.nativeElement.value = 'Hi... Money has been sent. Please check your account for credit.';
    expect(divDescription.nativeElement.value.length).toBeLessThan(501);
  });

  // it('should check label name to be Message sent successfully', () => {
  //   let labelName = fixture.debugElement.query(By.css("#sentSuccess"));
  //   expect(labelName.nativeElement.textContent.trim()).toBe('Message sent successfully');
  // });

  it('should check button name to be Send', () => {
    let labelName = fixture.debugElement.query(By.css("#sendMsgBtnBot"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Send');
  });

});
