import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { transactionPage } from './transactions.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('transactionPage', () => {
  let comp: transactionPage;
  let fixture: ComponentFixture<transactionPage>;
  let de: DebugElement;
  // let el: HTMLElement;
  let service : AuthService ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
      ],
      declarations: [
        transactionPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(transactionPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(transactionPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Transactions'`, () => {
    const fixture = TestBed.createComponent(transactionPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Transactions');
  });

  it('should check buton name to be 7 Days', () => {
    let labelName = fixture.debugElement.query(By.css("#days7"));
    expect(labelName.nativeElement.textContent.trim()).toBe('7 Days');
  });

  it('should check buton name to be 30 Days', () => {
    let labelName = fixture.debugElement.query(By.css("#days30"));
    expect(labelName.nativeElement.textContent.trim()).toBe('30 Days');
  });

  it('should check label name to be Transaction Details', () => {
    let labelName = fixture.debugElement.query(By.css("#transactionDetails"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Transaction Details');
  });

  it('should check label name to be Paid To', () => {
    let labelName = fixture.debugElement.query(By.css("#paidTo"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Paid To');
  });

  it('should check label name to be Country', () => {
    let labelName = fixture.debugElement.query(By.css("#country"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Country');
  });

  it('should check label name to be Mobile Number', () => {
    let labelName = fixture.debugElement.query(By.css("#mobNumber"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Mobile Number');
  });

  it('should check label name to be Vendor', () => {
    let labelName = fixture.debugElement.query(By.css("#vendor"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Vendor');
  });

  it('should check label name to be Delivery Method', () => {
    let labelName = fixture.debugElement.query(By.css("#deliveryMethod"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Delivery Method');
  });

  it('should check label name to be Amount', () => {
    let labelName = fixture.debugElement.query(By.css("#amount"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Amount');
  });

  it('should check label name to be Payment Method', () => {
    let labelName = fixture.debugElement.query(By.css("#paymentMethod"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Payment Method');
  });

  it('should check label name to be Total Fee', () => {
    let labelName = fixture.debugElement.query(By.css("#totalFee"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Total Fee');
  });

  it('should check label name to be Total Amount', () => {
    let labelName = fixture.debugElement.query(By.css("#totAmount"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Total Amount');
  });

});
