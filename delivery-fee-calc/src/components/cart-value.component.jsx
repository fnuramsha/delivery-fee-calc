const CartValue = () => {
  const Calculate = () => {
    const cartVal = document.getElementById("cartValueInput").value;
    if (cartVal < 10) {
      return console.log("add surcharge");
    } else if (cartVal >= 10) {
      console.log("Delivery price is same");
    }
  };
  return (
    <div>
      <form>
        <h2> Delivery Fee Calculator </h2>
        <label> Cart Value </label>
        <input type="text" placeholder=" " />
        <span> Euro </span>
        <br />
        <br />
        <button type="button" onClick={() => Calculate}>
          {" "}
          Calculate Delivery price{" "}
        </button>

        <br />
        <br />
        <span> Delivery price: 0</span>
      </form>
    </div>
  );
};
export default CartValue;
