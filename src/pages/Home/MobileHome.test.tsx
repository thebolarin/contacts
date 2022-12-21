import { fireEvent, screen } from '@testing-library/dom';
import ReactDOM from 'react-dom';
import MobileHome from '.';


describe('<MobileHome />', () => {
  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MobileHome />, div);
    document.body.appendChild(div);
    screen.debug();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
