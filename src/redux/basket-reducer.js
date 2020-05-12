const ADD_TO_BASKET = 'ADD-TO-BASKET';
const ADD_SUMMA = 'ADD-SUMMA';
const REMOVE_SUMMA='REMOVE-SUMMA';
const CHANGE_QUANTITY='CHANGE-QUANTITY';
const SET_REGIONS='SET-REGIONS';

let initialState={
    basketData:[],
    quantity:[],
    summa:0,
    regionsData:[]
}

const basketReducer=(state=initialState,action)=>{

    switch (action.type) {
        case ADD_TO_BASKET: {
           // let stateCopy = {...state};
          //  stateCopy.basketData = [...state.basketData];
            state.basketData = action.data;
            console.log(state.basketData);

            for(let i=0;i<state.basketData.length;i++){
                let temp = {};
                temp.products = state.basketData[i].product.id;
                temp.quantity = state.basketData[i].quantity;
                state.quantity.push(temp);
            }
            console.log(state.quantity);
            return state;
        }
        case ADD_SUMMA: {
            let stateCopy = {...state};
            stateCopy.summa = stateCopy.summa + action.data;
            return stateCopy;
        }
        case REMOVE_SUMMA: {
            let stateCopy = {...state};
            stateCopy.summa = stateCopy.summa - action.data;
            return stateCopy;
        }
        case CHANGE_QUANTITY:{
            console.log(state.quantity)
            //let stateCopy={...state};
            // for (let i=0;i<state.quantity.length;i++){
            //     console.log(action.id);
            //     if(state.quantity[i].products===action.id){
            //         if (action.quantity) {
            //             state.quantity[i].quantity=parseInt(state.quantity[i].quantity)+1
            //         }else{
            //             state.quantity[i].quantity=parseInt(state.quantity[i].quantity)-1
            //         }
            //     }
            // }
            // console.log(state.quantity);
            // return state
            return {
                ...state,
                quantity: state.quantity.map(q=>{
                    if (q.products===action.id){
                        if (action.quantity){
                            q.quantity=parseInt(q.quantity)+1;
                        }else {
                            q.quantity=parseInt(q.quantity)-1;
                        }
                    }
                    console.log(q.quantity);
                    return q;
                })
            }
        }
        case SET_REGIONS:{
            let stateCopy = {...state};
            stateCopy.regionsData=action.data;
            return stateCopy;
        }
        default:
            return state
    }
};

export const AddToBasketActionCreator = (data)=>({type:ADD_TO_BASKET,data:data});
export const AddSummaActionCreator = (data)=>({type:ADD_SUMMA,data:data});
export const RemoveSummaActionCreator = (data)=>({type:REMOVE_SUMMA,data:data});
export const ChangeQuantityActionCreator=(id,quantity)=>({type:CHANGE_QUANTITY,id:id,quantity:quantity});
export const SetRegionsActionCreator = (data)=>({type:SET_REGIONS,data:data});


export default basketReducer;