interface loginInformation{
    email:string;
    password:string
}
interface loginError{
    emailError?:string;
    passwordError?:string
}
export const loginPageValidator=(loginState:loginInformation)=>{
    const errors:Partial<loginError>={}
    if(loginState.email.length===0){
        errors.emailError="Cannot leave email empty"
    }
    else if (!loginState.email.includes('@')){
        errors.emailError="Invalid email format"
    }
    else if(loginState.password.length===0){
        errors.passwordError="Cannot leave password empty"
    }
    else if (loginState.password.length<=6){
        errors.passwordError="Short password"
    }
    const hasErrors:boolean=Object.keys(errors).length>0;
    
    return {hasErrors,errors}
}

interface signinInformation{
    name:string;
    email:string;
    password:string
}
interface signinError{
    nameError?:string;
    emailError?:string;
    passwordError?:string
}
export const signinPageValidator=(signinState:signinInformation)=>{
    const errors:Partial<signinError>={}
    if(signinState.name.length===0){
        errors.nameError="Cannot leave name empty"
    }
    else if (signinState.name.length<4){
        errors.nameError="Name too short.Impossible"
    }
    else if (signinState.email.length===0){
        errors.emailError="Cannot leave email empty"
    }
    else if (!signinState.email.includes("@")){
        errors.emailError="Invalid email format"
    }
    else if (signinState.password.length===0){
        errors.passwordError="Cannot leave password empty"
    }
    else if (signinState.password.length<6){
        errors.passwordError="Password must be 6 digit long"
    }
    const hasErrors:boolean=Object.keys(errors).length>0;
    
    return {hasErrors,errors}

}