   const initialState = {
    foods: [
    "Phô mai", 
   "Bánh ngọt",
   "Thịt bò",
   "Thịt gà",
   "Thịt lợn",
   "Thịt vịt",
   "Rau củ quả", 
   "Hải sản",
   "Thịt thỏ",
   "Thịt cừu",
    ]
  };
  
  
  export function foodReducer(state = initialState, { type, ...rest }) {
    switch (type) {
      default:
        return state;
    }
  }
  
  