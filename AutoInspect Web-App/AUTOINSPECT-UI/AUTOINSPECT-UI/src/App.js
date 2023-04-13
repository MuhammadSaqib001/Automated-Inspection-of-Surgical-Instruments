// // routes
import Router from './routes';
// // theme
import ThemeProvider from './theme';
// // components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

import { Crud } from "./components/crud/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Realtimedata } from './components/realtimedata';

// import User from './_mock/user';
import MyComponent from "./firebase2/MyComponent";
import InstrumentsCount from "./pages/InstrumentsCount";
// ----------------------------------------------------------------------

export default function App() {
  return (
  //  <Realtimedata/>
    //  <User/>
    // <Crud/>
    // <Test/>
    // <div>
    //   <h1>My App</h1>
    //   <MyComponent />
    // </div>
    // <InstrumentsCount/>
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
