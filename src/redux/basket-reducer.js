const ADD_TO_BASKET = 'ADD-TO-BASKET';
const ADD_SUMMA = 'ADD-SUMMA';
const REMOVE_SUMMA='REMOVE-SUMMA';

let initialState={
    basketData:[],
    summa:0
}

const basketReducer=(state=initialState,action)=>{

    switch (action.type) {
        case ADD_TO_BASKET: {
           // let stateCopy = {...state};
          //  stateCopy.basketData = [...state.basketData];
            state.basketData = action.data;
            console.log(action.data);
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
        default:
            return state
    }
};

export const AddToBasketActionCreator = (data)=>({type:ADD_TO_BASKET,data:data});
export const AddSummaActionCreator = (data)=>({type:ADD_SUMMA,data:data});
export const RemoveSummaActionCreator = (data)=>({type:REMOVE_SUMMA,data:data});


export default basketReducer;