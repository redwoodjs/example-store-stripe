const List = ({ array, item: Item, type = 'column' }) => {
  return (
    <ul className={`list list--${type}`}>
      {array.map((data, i) => (
        <li className="list__item" key={`${Item.name}-${i}--list__item`}>
          <Item {...data} />
        </li>
      ))}
    </ul>
  )
}

export default List
