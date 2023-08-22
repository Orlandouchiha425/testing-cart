export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
  return (
    <div>
      <span>{lineItem.item.price.toFixed(2)}</span>

      <div>
        {!isPaid && (
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(lineItem._id, lineItem.qty - 1)}
          >
            -
          </button>
        )}
        <span>{lineItem.qty}</span>
        {!isPaid && (
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
          >
            +
          </button>
        )}
      </div>
      <div>${lineItem.extPrice.toFixed(2)}</div>
    </div>
  );
}
