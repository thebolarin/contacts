import { screen } from '@testing-library/dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import '../../matchMedia'
import DeleteContact from './DeleteContact';
import { viewContactMockData } from '../../mockData'

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<DeleteContact />', () => {
  it('renders correctly', async () => {
    const mockData = await viewContactMockData()
    await act(async () => {
      render(
        <DeleteContact contact={mockData[0]} contactToDelete={mockData[0]} isOpen={mockData[0]} />, container);
    });

    expect(screen.getByText("Are you sure? You can't undo this action afterwards.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });
});
