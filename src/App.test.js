import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Index from './routes/Index';
import { ZonkyContext } from "./zonkyService";
import loans from "./mockLoans.json";
import LoanItem from './components/LoanItem';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { truncate } from './utils';

it('renders without crashing', () => {
  shallow(<App />);
});

describe('Index', () => {
  const indexFixture = mount(<Router>
    <ZonkyContext.Provider value={loans} >
      <Index />
    </ZonkyContext.Provider>
  </Router>);

  it('Index lists 20 offers', () => {
    const items = indexFixture.find(LoanItem);
    expect(items.length).toBe(20);
  });

  it('Index can be sorted', () => {
    const itemOrder = indexFixture.find(LoanItem).map(item => item.prop('termInMonths'));
    expect(itemOrder).toEqual([
      42, 54, 84, 78, 84, 84, 84, 84, 27, 29, 84, 72, 30, 37, 84, 45, 84, 84, 84, 72,
    ]);

    const sortByButton = indexFixture.find('.sortBy-termInMonths').first();
    sortByButton.simulate('click');

    const sortedItemOrder = indexFixture.find(LoanItem).map(item => item.prop('termInMonths'));
    expect(sortedItemOrder).toEqual([
      27, 29, 30, 37, 42, 45, 54, 72, 72, 78, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84,
    ]);
  });
});

describe('truncate', () => {
  const lipsum = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam ante. Mauris tincidunt sem sed arcu. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Suspendisse sagittis ultrices augue. Aliquam erat volutpat. Maecenas sollicitudin. Integer imperdiet lectus quis justo. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. Donec quis nibh at felis congue commodo. Vestibulum fermentum tortor id mi. Fusce wisi.';

  it('returns shortened string to target amount of words', () => {
    const actual = truncate(lipsum, 2, 1000);
    expect(actual).toBe('Lorem ipsum…');
  });

  it('returns shortened string to target amount of characters', () => {
    const actual = truncate(lipsum, 1000, 20);
    expect(actual).toBe('Lorem ipsum dolor…');
  });

  it('returns original string if shorter target amount of words and characters', () => {
    const actual = truncate(lipsum, 1000, 1000);
    expect(actual).toBe(lipsum);
  });
});
