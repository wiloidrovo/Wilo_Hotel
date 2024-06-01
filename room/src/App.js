import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import store from './store';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import AnimatedRoutes from 'AnimatedRoutes';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>WILO'S HOTEL</title>
        <meta name="canonical" content="Luxury hotel accessible to everyone. Come and Feel Free."/>
        <meta name="keywords" content='hotel, full services, comfort, luxury'/>
        <meta name="robots" content='all'/>
        <link rel="canonical" href="https://www.wilo.com" />
        <meta name="author" content='Wilo'/>
        <meta name="publisher" content='Wilo'/>

        {/* Social Media Tags */}
        <meta property="og:title" content='WILOS HOTEL' />
        <meta property="og:description" content='Luxury hotel accessible to everyone. Come and Feel Free..' />
        <meta property="og:url" content="https://www.wilo.com/" />
        <meta property="og:image" content='' />

        <meta name="twitter:title" content='WILOS HOTEL' />
        <meta
            name="twitter:description"
            content='Luxury hotel accessible to everyone..'
        />
      </Helmet>
      <Provider store={store}>
      <Router>
        <AnimatedRoutes/>
      </Router>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
