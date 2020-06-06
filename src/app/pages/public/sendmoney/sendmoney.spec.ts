import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { sendmoneyPage } from './sendmoney.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('sendmoneyPage', () => {
  let comp: sendmoneyPage;
  let fixture: ComponentFixture<sendmoneyPage>;
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
        sendmoneyPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(sendmoneyPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(sendmoneyPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });
  it(`should have as title 'Send Money'`, () => {
    const fixture = TestBed.createComponent(sendmoneyPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Send Money');
  });

  it('should check label name to be Receiver Info', () => {
    let labelName = fixture.debugElement.query(By.css("#receiverInfo"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Receiver Info');
  });

  it('should check label name to be Receiver', () => {
    let labelName = fixture.debugElement.query(By.css("#receiver-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Receiver');
  });

  // it('should receiver name not to be undefined', () => {
  //   let labelName = fixture.debugElement.query(By.css("#fromNewTransfer"));
  //   labelName.nativeElement.value = "Eric";
  //   expect(labelName.nativeElement.value.length).toBeGreaterThanOrEqual(1);
  // });

  it('should check label name to be Country', () => {
    let labelName = fixture.debugElement.query(By.css("#country-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Country');
  });

  // it('should receiver country not to be undefined', () => {
  //   let labelName = fixture.debugElement.query(By.css("#receiverCountry"));
  //   labelName.nativeElement.value = "Mexico";
  //   expect(labelName.nativeElement.value.length).toBeGreaterThanOrEqual(1);
  // });

  it('should check label name to be Phone Number', () => {
    let labelName = fixture.debugElement.query(By.css("#phoneNumber-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Phone Number');
  });

  it('should phone number pattern to be matched', () => {
    let labelName = fixture.debugElement.query(By.css("#phoneNumber-val"));
    labelName.nativeElement.value = '+19991114444';
    expect(labelName.nativeElement.value).toMatch("[+][0-9]+");
  });

  it('check phone number length', () => {
    const divDescription = fixture.debugElement.query(By.css('#phoneNumber-val'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value.length).toBeGreaterThan(10);
  });

  it('should check label name to be State', () => {
    let labelName = fixture.debugElement.query(By.css("#state-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('State');
  });

  it('should check label to be City/Town', () => {
    let labelName = fixture.debugElement.query(By.css("#city-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("City/Town");
  });

  it('should check label to be Vendor', () => {
    let labelName = fixture.debugElement.query(By.css("#vendor-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Vendor");
  });

  it('should check label to be Delivery Method', () => {
    let labelName = fixture.debugElement.query(By.css("#delivery-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Delivery Method");
  });

  it('should check label to be Pay To First Name', () => {
    let labelName = fixture.debugElement.query(By.css("#payTo1-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Pay To First Name");
  });

  it('should check Pay To First Name not to be undefined', () => {
    let labelName = fixture.debugElement.query(By.css("#payTo1-val"));
    labelName.nativeElement.value = "Eric";
    expect(labelName.nativeElement.value.length).toBeLessThanOrEqual(30);
  });

  it('should check Pay To First Name not to be undefined', () => {
    let labelName = fixture.debugElement.query(By.css("#payTo1-val"));
    labelName.nativeElement.value = "Eric";
    expect(labelName.nativeElement.value.length).toBeGreaterThan(0);
  });

  it('should check label to be Pay To Last Name', () => {
    let labelName = fixture.debugElement.query(By.css("#payTo2-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Pay To Last Name");
  });

  it('should check Pay To Last Name not to be undefined', () => {
    let labelName = fixture.debugElement.query(By.css("#payTo2-val"));
    labelName.nativeElement.value = "Eric";
    expect(labelName.nativeElement.value.length).toBeLessThanOrEqual(30);
  });

  it('should check Pay To Last Name not to be undefined', () => {
    let labelName = fixture.debugElement.query(By.css("#payTo2-val"));
    labelName.nativeElement.value = "Eric";
    expect(labelName.nativeElement.value.length).toBeGreaterThan(0);
  });

  it('should check Pay To Middle Name not to be undefined', () => {
    let labelName = fixture.debugElement.query(By.css("#payTo3-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Pay To Middle Name");
  });

  it('should check Pay To Middle Name not to be undefined', () => {
    let labelName = fixture.debugElement.query(By.css("#payTo3-val"));
    labelName.nativeElement.value = "Eric";
    expect(labelName.nativeElement.value.length).toBeLessThanOrEqual(30);
  });

  it('should check Pay To Middle Name not to be less than 30', () => {
    let labelName = fixture.debugElement.query(By.css("#payTo3-val"));
    labelName.nativeElement.value = "Eric";
    expect(labelName.nativeElement.value.length).toBeGreaterThan(0);
  });

  it('should check label to be Location', () => {
    let labelName = fixture.debugElement.query(By.css("#location-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Location");
  });

  it('should check label to be Bank Name', () => {
    let labelName = fixture.debugElement.query(By.css("#bank-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Bank Name");
  });

  it('should check label to be Account Number', () => {
    let labelName = fixture.debugElement.query(By.css("#account-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Account Number");
  });

  it('should check label to be Account Name', () => {
    let labelName = fixture.debugElement.query(By.css("#accountName-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Account Name");
  });

  it('should check label to be Routing Number', () => {
    let labelName = fixture.debugElement.query(By.css("#routing-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Routing Number");
  });

  it('should check button to be Save', () => {
    let labelName = fixture.debugElement.query(By.css("#save-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Save");
  });

  it('should check button to be You Send', () => {
    let labelName = fixture.debugElement.query(By.css("#yousend"));
    expect(labelName.nativeElement.textContent.trim()).toBe("You Send");
  });

  it('should check button to be Receives', () => {
    let labelName = fixture.debugElement.query(By.css("#receives"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Receives");
  });

  it('should check label to be Receiver Information', () => {
    let labelName = fixture.debugElement.query(By.css("#preview-receiver-info"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Receiver Information");
  });

  it('should check label to be Pay To', () => {
    let labelName = fixture.debugElement.query(By.css("#payTo-preview"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Pay To");
  });

  it('should check label to be Country', () => {
    let labelName = fixture.debugElement.query(By.css("#country-preview"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Country");
  });

  it('should check label to be Mobile Number', () => {
    let labelName = fixture.debugElement.query(By.css("#mobile-preview"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Mobile Number");
  });

  it('should check label to be Vendor', () => {
    let labelName = fixture.debugElement.query(By.css("#vendor-preview"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Vendor");
  });

  it('should check label to be Delivery Method', () => {
    let labelName = fixture.debugElement.query(By.css("#delivery-preview"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Delivery Method");
  });

  it('should check label to be Delivery Method', () => {
    let labelName = fixture.debugElement.query(By.css("#delivery-preview"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Delivery Method");
  });

  it('should check label to be Transmission Information', () => {
    let labelName = fixture.debugElement.query(By.css("#transmission-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Transmission Information");
  });

  it('should check label to be Transmission Information', () => {
    let labelName = fixture.debugElement.query(By.css("#transmissioninfo-preview"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Transmission Information");
  });

  it('should check label to be Amount', () => {
    let labelName = fixture.debugElement.query(By.css("#amount-preview"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Amount");
  });

  it('should check label to be Payment Method', () => {
    let labelName = fixture.debugElement.query(By.css("#paymentmethod-preview"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Payment Method");
  });

  it('should check label to be Total Fee', () => {
    let labelName = fixture.debugElement.query(By.css("#total-preview"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Total Fee");
  });

  it('should check button to be Send', () => {
    let labelName = fixture.debugElement.query(By.css("#preview-save"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Send");
  });

  it('should check label to be Transaction Details', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Transaction Details");
  });

  it('should check label to be Paid To', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-paid-to"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Paid To");
  });

  it('should check label to be Country', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-country"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Country");
  });

  it('should check label to be Mobile Number', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-mobile"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Mobile Number");
  });

  it('should check label to be Vendor', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-vendor"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Vendor");
  });

  it('should check label to be Delivery Method', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-delivery-method"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Delivery Method");
  });

  it('should check label to be Amount', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-amount"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Amount");
  });

  it('should check label to be Payment Method', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-payment-method"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Payment Method");
  });

  it('should check label to be Total Fee', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-total-fee"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Total Fee");
  });

  it('should check label to be Total Amount', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-total-amount"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Total Amount");
  });

  it('should check button to be Send Again', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-send-again"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Send Again");
  });

  it('should check button to be Send Message', () => {
    let labelName = fixture.debugElement.query(By.css("#transaction-conf-send-msg"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Send Message");
  });

});
