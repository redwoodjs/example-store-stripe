/**
 * For a write-up on all the ways this could be done,
 * see https://www.developerway.com/posts/react-component-as-prop-the-right-way
 */
import styled from 'styled-components'

const List = ({ items, Component }) => {
  return (
    <Wrapper>
      {items.map((item) => (
        <li key={item.id}>
          <Component {...item} />
        </li>
      ))}
    </Wrapper>
  )
}

export default List

// Styles

const Wrapper = styled.ul`
  /*  ul resets */
  list-style: none;
  padding: 0;

  display: flex;
  gap: var(--size-3);
`
