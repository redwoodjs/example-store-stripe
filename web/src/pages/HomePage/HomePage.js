import PricesCell from 'src/components/PricesCell'

const HomePage = () => {
  return (
    <>
      <h2>Super Tokens</h2>
      <p>These are single-use tokens. Great for emergencies and gifts.</p>
      <PricesCell priceType="one_time" />

      <h2>Super Subs</h2>
      <p>
        Monthly subscriptions to superpowers. Great for the career supervillain,
        hero or parent.
      </p>
      <PricesCell priceType="recurring" />
    </>
  )
}

export default HomePage
