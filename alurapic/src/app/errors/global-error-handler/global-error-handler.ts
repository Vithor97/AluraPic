import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log.service'
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    
    constructor(private injector: Injector){}

    handleError(error: any): void {
        console.log('passei pelo handler')

        //posso fazer injeção assim 
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);

        const url = location instanceof PathLocationStrategy ? location.path() : '';

        const message = error.message ? error.message : error.toString(); 

        router.navigate(['/error'])

        StackTrace.fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames.map(sf => sf.toString())
                .join('\n');

                console.log(message);
                console.log(stackAsString);
                console.log('ofsaf')
                serverLogService.log({ 
                    message, 
                    url, 
                    userName: userService.getUserName(), 
                    stack: stackAsString}).subscribe(()=>{
                        console.log('error logged on server')
                    },
                    err =>{
                        console.log(err)
                        console.log('Falha ao manda para o servidor')
                    })
                                
              
            })
    }
    
}