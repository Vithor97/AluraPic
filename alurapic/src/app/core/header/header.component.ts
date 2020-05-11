import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit { 

    user$: Observable<User>;
    prev: Window;

    constructor(
        private userService: UserService, 
        private router:Router) {

        this.user$ = userService.getUser();
    }
    ngOnInit(): void {
            
            var prevScrollpos = window.pageYOffset;
            window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("navbarr").style.top = "0";
                console.log('hhjdsdjhshdj')
            } else {
                document.getElementById("navbarr").style.top = "-50px";
            }
            prevScrollpos = currentScrollPos;
            }

        // window.onscroll = function() {scrollFunction()};

        // function scrollFunction() {
        //     if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 80) {
        //         document.getElementById("navbarr").classList.add('teste');
                
        //     } else {
        //         document.getElementById("navbarr").classList.remove('teste');
                
        //     }
        // }
    }
    over(){
        document.getElementById("navbarr").style.top = "0";
    }
    fora(){

        // console.log('no metodo')
        // console.log(this.user$)
        if(this.user$ && window.pageYOffset > 0){
            document.getElementById("navbarr").style.top = "-50px";
        }
        else{
            document.getElementById("navbarr").style.top = "0";
        }
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['']);
    }

    
}