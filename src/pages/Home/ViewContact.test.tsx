import { screen } from '@testing-library/dom';
import { render, unmountComponentAtNode } from "react-dom";
import axios from 'axios';
import { act } from "react-dom/test-utils";
import '../../matchMedia'
import ViewContact from './ViewContact';
import { editContactMockData } from '../../mockData'

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

describe('<ViewContact />', () => {
  it('renders correctly', async () => {

    const mockData = await editContactMockData()
    
    mockedAxios.get.mockResolvedValue({ data: { data: { contact: mockData.contact, contactEditHistory: mockData.contactEditHistory } } });

    await act(async () => {
      render(
        <ViewContact contact={mockData.contact} contactId={mockData.contact._id} isOpen={mockData.contact._id} />, container);
    });

    expect(screen.getByText("Contact Details")).toBeInTheDocument();
    expect(screen.getByText("Edit History")).toBeInTheDocument();
  });
});
