export const reducer = (state, action) => {
  if (action.type === "START-LOADING") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "END-LOADING") {
    return {
      ...state,
      loading: false,
    };
  }
  if (action.type === "CLOSE-ALERT") {
    return {
      ...state,
      alert: {
        ...alert,
        alertCondition: false,
        alertType: "",
        alertMessage: "",
      },
    };
  }

  if (action.type === "UPDATE-INFORMATION") {
    return {
      ...state,
      personDetails: JSON.parse(localStorage.getItem("peopleSignedUp") || "[]"),
      loggedInUser: JSON.parse(localStorage.getItem("loggedUser") || "{}"),
      isUserLogged: JSON.parse(localStorage.getItem("isUserLogged")),
      orderList: JSON.parse(localStorage.getItem('orderList')||"[]")
    };
  }
  if (action.type === "GET_TOTALS") {
    const currentLoggedInUser = JSON.parse(
      localStorage.getItem("peopleSignedUp") || "[]"
    )?.find(
      (user) =>
        user.password ===
        JSON.parse(localStorage.getItem("loggedUser") || "{}").password
    );
    let { totalCost, totalAmount } = currentLoggedInUser?.userCart?.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * parseInt(amount);

        cartTotal.totalCost += itemTotal;
        cartTotal.totalAmount += parseInt(amount);
        return cartTotal;
      },
      {
        totalCost: 0,
        totalAmount: 0,
      }
    )||0;
    totalCost = parseFloat(totalCost?.toFixed(2));
    var currentUsers = JSON.parse(
      localStorage.getItem("peopleSignedUp") || "[]"
    );
    var currentUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
    var newCart = currentUsers?.map((user) => {
      if (user.password === currentUser.password) {
        user.totalCost = totalCost;
        user.totalAmount = totalAmount;
      }
      return user;
    });
    localStorage.setItem("peopleSignedUp", JSON.stringify(newCart));
    return state;
  }

  if (action.type === "CHANGE-COND") {
    return {
      ...state,
      updateCondition: !state.updateCondition,
    };
  }
  if (action.type === "SIGNED-OUT") {
    return {
      ...state,
      alert: {
        ...alert,
        alertCondition: true,
        alertType: "success",
        alertMessage: "signed out successfully",
      },
    };
  }
  if (action.type === "UNMATCHING-PASSWORD") {
    return {
      ...state,
      alert: {
        ...alert,
        alertCondition: true,
        alertType: "danger",
        alertMessage: "unmatching passwords",
      },
    };
  }
  if (action.type === "LOGIN-CART") {
    return {
      ...state,
      alert: {
        ...alert,
        alertCondition: true,
        alertType: "danger",
        alertMessage: "sign in to proceed",
      },
    };
  }
  if (action.type === "MISSING-INFO") {
    return {
      ...state,
      alert: {
        ...alert,
        alertCondition: true,
        alertType: "danger",
        alertMessage: "fill all the requirments",
      },
    };
  }
  if (action.type === "SIGNED-UP") {
    return {
      ...state,
      alert: {
        ...alert,
        alertCondition: true,
        alertType: "success",
        alertMessage: "signed up successfully",
      },
    };
  }
  if (action.type === "SIGNED-IN") {
    return {
      ...state,
      alert: {
        ...alert,
        alertCondition: true,
        alertType: "success",
        alertMessage: "signed in successfully",
      },
    };
  }
  if (action.type === "WRONG-CRED") {
    return {
      ...state,
      alert: {
        ...alert,
        alertType: "danger",
        alertMessage: "user is not found",
        alertCondition: true,
      },
    };
  }
  if (action.type === "NO-USERS") {
    return {
      ...state,
      alert: {
        ...alert,
        alertType: "danger",
        alertMessage: "please sign up",
        alertCondition: true,
      },
    };
  }
  throw new Error("no matching action type");
};
