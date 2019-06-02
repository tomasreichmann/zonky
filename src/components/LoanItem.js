/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from "../theme";
import { truncate } from '../utils';

const LoanItem = ({
  photos,
  name,
  amount,
  currency,
  story,
  termInMonths,
  rating,
  deadline,
  id
}) => {
  const imageUri = photos[0] ? photos[0].url : '/loans/485335/photos/59265';
  return (
    <div
      css={{
        color: theme.color.text,
        textDecoration: 'none'
      }}
    >
      <img src={`https://app.zonky.cz/api${imageUri}`} alt="" css={{
        display: 'block',
        width: '100%'
      }}/>
      <h2 css={{
        color: theme.color.secondary,
        margin: `0 0 ${theme.spacing / 4}px 0`
      }}>{name}</h2>
      <div>{truncate(story, 20, 200)}</div>
      <div css={{
        color: theme.color.primary,
        fontSize: '2rem',
        textAlign: 'right',
        fontWeight: 700
      }}>{amount} {currency}</div>
      <div css={{
        textAlign: 'right',
        fontWeight: 700
      }}>{rating}</div>
      <div css={{
        textAlign: 'right'
      }}>Délka splácení: {termInMonths} měsíců<br />do {new Date(deadline).toLocaleDateString()}</div>
    </div>
  )
};
export default LoanItem;
