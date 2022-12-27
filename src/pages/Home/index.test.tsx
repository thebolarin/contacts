import { render, unmountComponentAtNode } from "react-dom";
import axios from 'axios';
import { act } from "react-dom/test-utils";
import '../../matchMedia'
import { App } from '../../App';
import { viewContactMockData } from '../../mockData'

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

describe('<Home />', () => {
    it('renders correctly', async () => {

        const mockData = await viewContactMockData()

        mockedAxios.get.mockResolvedValue({ data: { data: { contacts: mockData } } });

        await act(async () => render(<App />, container));

        expect(container.textContent).toContain(mockData[0].firstName);
        expect(container.textContent).toContain(`${mockData.length} Contact(s)`);
    });
});
