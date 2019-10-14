import {Message} from 'element-ui';
export default (context)=>{
    context.$axios.onError(err=>{
        let {statusCode,message}=err.response.data;
        if(statusCode===400){
            Message.error(message);
        }

    })
}