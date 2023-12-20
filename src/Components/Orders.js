import React from "react";
const Orders = () => {
  var orderList = JSON.parse(localStorage.getItem("orderList") || "[]");

  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Address</th>
            <th scope="col">Amount</th>
            <th scope="col">Total Cost</th>
            <th scope="col">Date Of Purchase</th>
          </tr>
        </thead>
        <tbody>
          {orderList?.map((item) => {
            const { name, address, id, amount, cost, date } = item;
            return (
              <tr key={id}>
                <th scope="row">{name}</th>
                <td>{address}</td>
                <td>{amount}</td>
                <td>${cost}</td>
                <td>{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
