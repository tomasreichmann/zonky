/** @jsx jsx */
import { jsx, Global, css } from '@emotion/core'
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import theme from "./theme";

const Page = ({children, title = 'Zonky Marketplace'}) => (<div className="App">
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Slab&amp;display=swap" />
  </Helmet>
  <Global styles={css({
    html: theme.typography.html,
    body: theme.typography.base,
    a: {
      color: theme.color.link
    }
  })}/>
  <header css={{
    boxShadow: '0 2px 8px 0 rgba(0,0,0,.2)',
    backgroundColor: theme.color.paper,
    zIndex: 100,
    position: 'relative'
  }}>
    <Link to="/" >
      <img src="https://zonky.cz/images/nav-logo/svgs/zonky_cz_1.svg" alt="Zonky" css={{ height: '6rem', display: 'block'}}/>
    </Link>
  </header>
  <main css={{
    padding: theme.spacing,
    backgroundColor: theme.color.paper
  }}>
    {children}
  </main>
</div>);

export default Page;