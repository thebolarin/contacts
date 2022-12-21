import { fireEvent, screen } from '@testing-library/dom';
import ReactDOM from 'react-dom';
import EditContact from '.';

describe('<EditContact />', () => {
  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditContact />, div);
    document.body.appendChild(div);
    screen.debug();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
