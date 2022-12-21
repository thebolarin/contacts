import { fireEvent, screen } from '@testing-library/dom';
import ReactDOM from 'react-dom';
import ViewContact from '.';

describe('<ViewContact />', () => {
  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ViewContact />, div);
    document.body.appendChild(div);
    screen.debug();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
