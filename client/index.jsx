import ReactDOM from 'react-dom';

import App from './App';

const Root = () => {
  return (
    <div>
      <App />
    </div>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));

if (module['hot']) {
  module['hot'].accept(['./App'], () => {
    ReactDOM.render(<Root />, document.querySelector('#root'));
  });
}
