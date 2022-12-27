import { fireEvent, screen } from '@testing-library/dom';
import ReactDOM from 'react-dom';
import CreateContact from '.';


describe('<CreateContact />', () => {
  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateContact />, div);
    document.body.appendChild(div);
    // screen.debug();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

