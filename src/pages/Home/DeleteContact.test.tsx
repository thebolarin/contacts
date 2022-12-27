import { fireEvent, screen } from '@testing-library/dom';
import ReactDOM from 'react-dom';
import DeleteContact from '.';


describe('<DeleteContact />', () => {
  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DeleteContact />, div);
    document.body.appendChild(div);
    // screen.debug();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
