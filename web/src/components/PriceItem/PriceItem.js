export const PriceItem = ({id, nickname, product: {images, name, description}}) => {
  const onCartButtonClick = () => {
    handleAddToCart(id)
  }

  return (
    <div className="price-item--card">

      <figure
      className='price-item__figure'>
      <img
          alt={`A human using the ${name} superpower`}
          src={images[0]} />
        <figcaption>
          {name}
        </figcaption>
      </figure>
      <button onClick={onCartButtonClick}>Add to Cart</button>
  </div>)
}
