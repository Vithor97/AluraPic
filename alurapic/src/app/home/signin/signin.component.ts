import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    fromUrl:string
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {

        //to pegando a url depois que tentei acessar a rota protegida
        this.activatedRoute.queryParams.subscribe(params => {
            this.fromUrl = params['fromUrl'];
        })

        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.platformDetectorService.isPlatformBrowser() && 
        this.userNameInput.nativeElement.focus();        
    } 

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => {
                    console.log('Tem que algo no fromUrl? :' + this.fromUrl)
                    if(this.fromUrl){
                        this.router.navigateByUrl(this.fromUrl);
                    }else{
                        this.router.navigate(['user', userName]);
                    }
                },
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    this.platformDetectorService.isPlatformBrowser() && 
                        this.userNameInput.nativeElement.focus();
                    alert('Invalid user name or password');
                }
            );
    }
}