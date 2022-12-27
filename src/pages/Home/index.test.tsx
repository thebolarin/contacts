import { fireEvent, screen, waitFor } from '@testing-library/dom';
import ReactDOM from 'react-dom';
import Home from '.';

describe('<Home />', () => {
  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
    document.body.appendChild(div);
    // screen.debug();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
