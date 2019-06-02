/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core'
import theme from "../theme";
import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { sortLoans } from '../utils';
import Page from "../Page";
import LoanItem from "../components/LoanItem";

import { ZonkyContext } from "../zonkyService";

const sortOptions = [
  {
    sortByKey: 'amount',
    defaultSortByDirectionAsc: true,
    label: 'požadované částky'
  },
  {
    sortByKey: 'termInMonths',
    defaultSortByDirectionAsc: true,
    label: 'délky trvání'
  },
  {
    sortByKey: 'deadline',
    defaultSortByDirectionAsc: true,
    label: 'deadlinu'
  },
  {
    sortByKey: 'rating',
    defaultSortByDirectionAsc: true,
    label: 'ratingu'
  },
];

const sortStyle = {
  background: 'transparent',
  border: 0,
  padding: `0 ${theme.spacing / 2}px`,
  ...theme.typography.base,
  color: theme.color.action,
  fontWeight: 700,
  cursor: 'pointer'
}
const sortActiveStyle = {
  ...sortStyle,
  color: theme.color.primary,
}

const Index = () => {
  const loans = useContext(ZonkyContext);
  const [{key: currentSortByKey, isAsc: currentSortIsAsc}, setSortBy] = useState({
    key: sortOptions[0].sortByKey,
    isAsc: sortOptions[0].defaultSortByDirectionAsc
  });

  return (
    <Page>
      <div css={{
        paddingBottom: theme.spacing / 2,
        marginBottom: theme.spacing,
        borderBottom: `1px solid ${theme.color.border}`,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }} >
        <h1 css={{
          color: theme.color.primary,
          flex: '1 1 auto',
          lineHeight: 'inherit',
          margin: 0
        }}>Tržiště</h1>
        <span>Seřadit podle</span>
        {
          sortOptions.map(({sortByKey, defaultSortByDirectionAsc, label}) => {
            const isActive = currentSortByKey === sortByKey;
            const isAsc = isActive ? currentSortIsAsc : defaultSortByDirectionAsc;
            const nextAsc = isActive ? !currentSortIsAsc : defaultSortByDirectionAsc;
            const caretSymbol = isAsc ? '▲' : '▼'
            const caret = isActive ? <span>&ensp;{caretSymbol}</span> : null
            return (
              <button
                key={sortByKey}
                className={`sortBy-${sortByKey}`}
                onClick={() => setSortBy({key: sortByKey, isAsc: nextAsc})}
                css={isActive ? sortActiveStyle : sortStyle}
              >{label}{caret}</button>
            )
          })
        }
      </div>

      {(loans && loans.length)
        ? (
          <div css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gridGap: theme.spacing
          }} >
            {
              sortLoans(loans, currentSortByKey, currentSortIsAsc)
                .map((loan) => <Link to={`/loan/${loan.id}`} key={loan.id} css={{
                  textDecoration: 'none'
                }}><LoanItem {...loan}/></Link>)
            }
          </div>
        ) : <div>...</div>
      }
    </Page>
  );
}

export default Index;