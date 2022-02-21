import styled from 'styled-components'

const List = ({ array, item: Item }) => {
  return (
    <Wrapper>
      {array.map((data, i) => (
        <ListItem key={`${Item.name}-${i}`}>
          <Item {...data} />
        </ListItem>
      ))}
    </Wrapper>
  )
}

export default List

// Styles

const Wrapper = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: flex-start;
`

const ListItem = styled.li`
  flex-direction: row;
  margin-top: 1.2em;

  &::first-of-type {
    margin-top: 0;
  }
`
