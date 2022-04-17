/**
 * For a write-up on all the ways this could be done,
 * see https://www.developerway.com/posts/react-component-as-prop-the-right-way
 */
import styled from 'styled-components'

const List = ({ items, Component, direction = 'row' }) => {
  return (
    <Wrapper
      // This is a pattern Josh Comeau recommends for dynamic styles in styled components.
      // See https://www.joshwcomeau.com/css/styled-components/.
      style={{
        '--direction': direction,
      }}
    >
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
  /*
    <ul> resets.
  */
  list-style: none;
  padding: 0;

  display: flex;
  flex-direction: var(--direction);
  justify-content: center;
  gap: var(--padding);
`
