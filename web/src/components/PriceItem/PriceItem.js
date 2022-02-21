const PriceItem = ({ product: { images, name } }) => {
  // const onCartButtonClick = () => {
  //   // ignore
  // }

  return (
    <div className="price-item--card">
      <figure className="price-item__figure">
        <img alt={`A human using the ${name} superpower`} src={images[0]} />
        <figcaption>{name}</figcaption>
      </figure>
      {/* <button onClick={onCartButtonClick}>Add to Cart</button> */}
    </div>
  )
}

export default PriceItem
