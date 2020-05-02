export interface ServerLog { 
    message: string;
    url: string;
    userName: string;
    stack: string;

}

//console.log({ message: url, userName: userService.getUserName(), stack: stackAsString});