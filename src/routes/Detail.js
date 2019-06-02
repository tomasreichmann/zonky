/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from "react-router-dom";
import theme from "../theme";
import { useContext } from 'react';
import Page from "../Page";

import { ZonkyContext } from "../zonkyService";

const Detail = ({ match: { params: { id = '485740'}} }) => {
  const loans = useContext(ZonkyContext);
  const loan = loans && loans.length && loans.find(loan => loan.id === parseInt(id, 10));

  if (!loan) {
    return <Page title="Tento příběh už není k dispozici" >
      <h2>
        Tento příběh už není k dispozici. <br /><Link to="/">Zpět na seznam příběhů</Link>
      </h2>
    </Page>
  }

  const {
    photos,
    name,
    amount,
    currency,
    story,
    termInMonths,
    rating,
    deadline,
    ...otherData
  } = loan;

  const imageUri = photos[0] ? photos[0].url : '/loans/485335/photos/59265';

  return (
    <Page title={name}>
      <div css={{
        paddingBottom: theme.spacing / 2,
        marginBottom: theme.spacing,
        borderBottom: `1px solid ${theme.color.border}`,
      }}><Link to="/">Všechny dluhy</Link> > {name}</div>
      <div css={{
        display: 'grid',
        gridGap: theme.spacing,
        gridTemplateColumns: '1fr 2fr'
      }}>
        <div>
          <img src={`https://app.zonky.cz/api${imageUri}`} alt="" css={{
            width: '100%'
          }}/>
        </div>
        <div>
          <h1 css={{
            color: theme.color.primary,
            margin: `0 0 ${theme.spacing / 4}px 0`
          }}>{name}</h1>
          <div>{story}</div>
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
          <pre>{JSON.stringify(otherData, null, 2)}</pre>
        </div>
      </div>
    </Page>
  );
}

export default Detail;