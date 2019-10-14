export function state(){
    return{
        userinfo:{}
    }
}

export let mutations={
    SetUserInfo(state,data){
        state.userinfo=data;
    }
}