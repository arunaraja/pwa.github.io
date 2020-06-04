import { TestBed, async ,ComponentFixture, inject, fakeAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { loginPage } from './login.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
// import { HttpClientTestingModule  } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('loginPage', () => {
  let comp: loginPage;
  let fixture: ComponentFixture<loginPage>;
  let de: DebugElement;
  let el: HTMLElement;
  let service : AuthService ;
  let baseUrl = environment.baseUrl;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        // HttpClientTestingModule,
        // HttpTestingController,
        FormsModule,
      ],
      declarations: [
        loginPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(loginPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));
  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(loginPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Login'`, () => {
    const fixture = TestBed.createComponent(loginPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Login');
  });

  it('should check label name to be ENVIA MEJOR', () => {
    let labelName = fixture.debugElement.query(By.css("#loginTitle"));
    expect(labelName.nativeElement.textContent.trim()).toBe('ENVIA MEJOR');
  });

  it('should check label name to be Thank you for registering', () => {
    let labelName = fixture.debugElement.query(By.css("#thankYouReg"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Thank you for registering');
  });

  it('should check label name to be with Envia Mejor', () => {
    let labelName = fixture.debugElement.query(By.css("#thankYouRegEM"));
    expect(labelName.nativeElement.textContent.trim()).toBe('with Envia Mejor');
  });

  it('should check label name to be Login', () => {
    let labelName = fixture.debugElement.query(By.css("#loginPage"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Login');
  });

  it('check phone number pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#loginPhone'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value).toMatch("[+][0-9]+");
  });

  it('check phone number length', () => {
    const divDescription = fixture.debugElement.query(By.css('#loginPhone'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value.length).toBeGreaterThan(10);
  });

  it('check pincode 1 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#loginInput1'));
    divDescription2.nativeElement.value = '2';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check pincode 2 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#loginInput2'));
    divDescription2.nativeElement.value = '3';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check pincode 3 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#loginInput3'));
    divDescription2.nativeElement.value = '9';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check pincode 4 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#loginInput4'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });
  
  it('check pincode length', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#loginInput1'));
    divDescription2.nativeElement.value = '2';
    const divDescription3 = fixture.debugElement.query(By.css('#loginInput2'));
    divDescription3.nativeElement.value = '3';
    const divDescription4 = fixture.debugElement.query(By.css('#loginInput3'));
    divDescription4.nativeElement.value = '9';
    const divDescription5 = fixture.debugElement.query(By.css('#loginInput4'));
    divDescription5.nativeElement.value = '6';
    const pin = divDescription2.nativeElement.value+""+divDescription3.nativeElement.value+""+divDescription4.nativeElement.value+""+divDescription5.nativeElement.value;
    expect(pin.length).toBe(4);
  });

  it('should check button name to be Go', () => {
    const labelName = fixture.debugElement.query(By.css("#loginInBtn"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Go');
  });

  it('should check Pincode place holder to be Pincode', () => {
    const labelName = fixture.debugElement.query(By.css("#loginPincode"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Pincode');
  });

  it('should check button name to be Forgot Pincode', () => {
    const labelName = fixture.debugElement.query(By.css("#forgotBtn"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Forgot Pincode');
  });

  it('should return login success',async( () => {
    fixture.detectChanges();
    service.post(baseUrl+"/api/user/loginUser",{"phoneNumber":"+19991114444","pin":'2396'}).subscribe((res) => {
      fixture.detectChanges(); 
    expect(res['status']).toBe(200);
    });
  }));

  it('should return login failure',async( async () => {
    fixture.detectChanges();
    service.post(baseUrl+"/api/user/loginUser",{"phoneNumber":"+19991114444","pin":'2386'}).subscribe((res) => {
      fixture.detectChanges(); 
    expect(res['status']).toBe(500);
    });
  }));

  // it('should return login success',() => {
  //   expect(comp.loginData('+19991114444','2396')).toBeTruthy();
  // });

  // it('should return login success',inject(['HttpClientTestingModule','AuthService'],(
  //   http:httpClient,service:AuthService) => {
  //   expect(service.post("http://192.168.43.134:3000/api/user/loginUser",{"phoneNumber":"+19991114444","pin":'2396'})).toBeTruthy();
  // }));




  // it('should return login success',() => {
  //   this.AuthService.post(this.baseUrl+"/api/user/loginUser"),{phoneNumber:+19991114444,pin:'2396'}).subscribe((res) => {
  //     if(res['data']){
  //   expect(comp.loginData('+19991114444','2396')).toBeTruthy();
  // });
  

  // it('should add an employee and return it', () => {
  //   const newEmp: Employee = { name: 'Mahesh', age: 25 };

  //   empService.addEmployee(newEmp).subscribe(
  //     data => expect(data).toEqual(newEmp, 'should return the employee'),
  //     fail
  //   );

  //   // addEmploye should have made one request to POST employee
  //   const req = httpTestingController.expectOne(empService.empUrl);
  //   expect(req.request.method).toEqual('POST');
  //   expect(req.request.body).toEqual(newEmp);

  //   // Expect server to return the employee after POST
  //   const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newEmp });
  //   req.event(expectedResponse);
  // });

  // it('should return login success',() => {
  //   console.log("comp.loginData")
  //   console.log(comp.loginData)
  //   expect(comp.loginData).toBeTruthy();
  // });


//   it(`should set submitted to true`, async(() => {
//     comp.onSubmit();
//     expect(comp.submitted).toBeTruthy();
//   }));

//   it(`should call the onSubmit method`, async(() => {
//     // spyOn(comp, 'onSubmit');
//     el = fixture.debugElement.query(By.css('button')).nativeElement;
//     el.click();
//     expect(comp.onSubmit()).toHaveBeenCalled();
//   }));

//  it(`form should be invalid`, async(() => {
//     comp.contactForm.controls['email'].setValue('');
//     comp.contactForm.controls['name'].setValue('');
//     comp.contactForm.controls['text'].setValue('');
//     expect(comp.contactForm.valid).toBeFalsy();
//   }));
  // it(`form should be valid`, async(() => {
  //   comp.contactForm.controls['email'].setValue('asd@asd.com');
  //   comp.contactForm.controls['name'].setValue('aada');
  //   comp.contactForm.controls['text'].setValue('text');
  //   expect(comp.contactForm.valid).toBeTruthy();
  // }));
});
