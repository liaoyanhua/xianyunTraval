export  let state = ()=>{
            return{flightHistoryInfo:[]}
}

export let mutations={
    setFlightsOrder(state,data){
        state.flightHistoryInfo.unshift(data);
    }
}