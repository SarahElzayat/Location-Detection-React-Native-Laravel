import apiHelper from "../api/api_helper";
import createDataContext from "./createDataContext";

const historyReducer = (state, action) => {
  switch (action.type) {
    case "addHistory":
      return [...state, action.payload];

    case "getHistory":
      //   console.log("====================================");
      //   console.log(action.payload);
      //   console.log("====================================");
      return action.payload;

    default:
      return state;
  }
};

// const addPlace = (dispatch) => {
//   return async (name, longitude, latitude, radius, callback) => {
//     const response = await apiHelper.post("/add-place", {
//       name,
//       longitude,
//       latitude,
//       radius,
//     });

//     if (callback) {
//       callback();
//     }

//     dispatch({ type: "addPlace", payload: response.data.place });
//   };
// };

// const getPlaces = (dispatch) => {
//   return async (callback) => {
//     const response = await apiHelper.get("/get-places");
//     if (callback) {
//       callback();
//     }

//     dispatch({ type: "getPlaces", payload: response.data.places });
//   };
// };

const addHistory = (dispatch) => {
  return async (longitude, latitude, callback) => {
    const response = await apiHelper.post("/add-history", {
      longitude,
      latitude,
    });

    if (callback) {
      callback();
    }

    dispatch({ type: "addHistory", payload: response.data.history });
  };
};

const getHistory = (dispatch) => {
  return async (callback) => {
    const response = await apiHelper.get("/get-history");
    if (callback) {
      callback();
    }

    dispatch({ type: "getHistory", payload: response.data.history });
  };
};

export const { Context, Provider } = createDataContext(
  historyReducer,
  { addHistory, getHistory },
  []
);
