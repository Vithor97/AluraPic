import { Component } from '@angular/core';

@Component({
    selector: 'ap-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent {

    isShown:boolean = false;

    toggle(){
        this.isShown = !this.isShown;
        console.log('clicou ' + this.isShown)
    }

    teste(){
        console.log('clicou em mim')
    }

}