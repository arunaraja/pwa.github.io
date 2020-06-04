import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { sendmoneyconfirmationPage } from './sendmoneyconfirmation.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('sendmoneyconfirmationPage', () => {
  let comp: sendmoneyconfirmationPage;
  let fixture: ComponentFixture<sendmoneyconfirmationPage>;
  // let de: DebugElement;
  // let el: HTMLElement;
  // let service : AuthService ;
//   comp.openNavBar = true ;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
      ],
      declarations: [
        sendmoneyconfirmationPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(sendmoneyconfirmationPage);
      comp = fixture.componentInstance;
      // de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      // service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(sendmoneyconfirmationPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Send Money Confirmation'`, () => {
    const fixture = TestBed.createComponent(sendmoneyconfirmationPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Send Money Confirmation');
  });

  it('should check label name to be Home', () => {
    let labelName = fixture.debugElement.query(By.css("#homePageNav"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Home');
  });
  
  it('should check label name to be Send Money', () => {
    let labelName = fixture.debugElement.query(By.css("#sendMoneyPageNav"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Send Money');
  });

  it('should check label name to be Transactions', () => {
    let labelName = fixture.debugElement.query(By.css("#transactionPageNav"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Transactions');
  });

  it('should check label name to be Manage Wallet', () => {
    let labelName = fixture.debugElement.query(By.css("#manageWalletPageNav"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Manage Wallet');
  });

  it('should check label name to be Settings', () => {
    let labelName = fixture.debugElement.query(By.css("#settingsPageNav"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Settings');
  });

  it('should check label name to be Logout', () => {
    let labelName = fixture.debugElement.query(By.css("#logOutNav"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Logout');
  });

  it('should check label name to be Transaction Details', () => {
    let labelName = fixture.debugElement.query(By.css("#transactionDet"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Transaction Details');
  });

  it('should check label name to be Your transaction is successful .', () => {
    let labelName = fixture.debugElement.query(By.css("#transactionSuccess"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Your transaction is successful .');
  });

  it('should check label name to be Paid To', () => {
    let labelName = fixture.debugElement.query(By.css("#paidTo"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Paid To');
  });

  it('should check label name to be Date', () => {
    let labelName = fixture.debugElement.query(By.css("#dateConf"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Date');
  });

  it('should check label name to be Mobile Number', () => {
    let labelName = fixture.debugElement.query(By.css("#mobileNoConf"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Mobile Number');
  });
  
  it('should check label name to be Address', () => {
    let labelName = fixture.debugElement.query(By.css("#addressConf"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Address');
  });

  it('should check label name to be Vendor', () => {
    let labelName = fixture.debugElement.query(By.css("#vendorConf"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Vendor');
  });

  it('should check label name to be Reference Code', () => {
    let labelName = fixture.debugElement.query(By.css("#refCodeCOnf"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Reference Code');
  });

  it('should check label name to be Delivery Method', () => {
    let labelName = fixture.debugElement.query(By.css("#deliveryMethodDef"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Delivery Method');
  });

  it('should check label name to be Payment Method', () => {
    let labelName = fixture.debugElement.query(By.css("#paymentMethodConf"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Payment Method');
  });

  it('should check label name to be Transaction Fee', () => {
    let labelName = fixture.debugElement.query(By.css("#transactionFeeConf"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Transaction Fee');
  });

  it('should check button name to be Send Again', () => {
    let labelName = fixture.debugElement.query(By.css("#sendAgain"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Send Again');
  });

  it('should check button name to be Send Message', () => {
    let labelName = fixture.debugElement.query(By.css("#sendMessageConf"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Send Message');
  });

});
