import { fireEvent, screen } from '@testing-library/dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import '../../matchMedia'
import EditContact from './EditContact';
import { faker } from '@faker-js/faker';
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

describe('<EditContact />', () => {
  it('renders correctly', async () => {

    const mockData = await viewContactMockData();

    await act(async () => {
      render(
        <EditContact contact={mockData[0]} isOpen={mockData[0]} />, container);
    });

    expect(screen.getByLabelText('Edit Contact')).toBeInTheDocument();
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toHaveValue(mockData[0].email);
    expect(screen.getByTestId('firstName')).toHaveValue(mockData[0].firstName);
    expect(screen.getByTestId('lastName')).toHaveValue(mockData[0].lastName);
    expect(screen.getByTestId('phoneNumber')).toHaveValue(mockData[0].phoneNumber);
  });

  it('Given valid credentials, returns a different payload from the old values', async () => {

    const mockData = await viewContactMockData()

    await act(async () => {
      render(
        <EditContact contact={mockData[0]} isOpen={mockData[0]} />, container);
    });

    expect(screen.getByLabelText('Edit Contact')).toBeInTheDocument();

    const email = screen.getByTestId('email');
    const firstName = screen.getByTestId('firstName');
    const lastName = screen.getByTestId('lastName')
    const phoneNumber = screen.getByTestId('phoneNumber')

    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toHaveValue(mockData[0].email);
    expect(screen.getByTestId('firstName')).toHaveValue(mockData[0].firstName);
    expect(screen.getByTestId('lastName')).toHaveValue(mockData[0].lastName);
    expect(screen.getByTestId('phoneNumber')).toHaveValue(mockData[0].phoneNumber);

    const fakeContact = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('+48 91 ### ## ##')
    };

    fireEvent.change(email, { target: { value: fakeContact.email } });
    fireEvent.change(firstName, { target: { value: fakeContact.firstName } });
    fireEvent.change(lastName, { target: { value: fakeContact.lastName } });
    fireEvent.change(phoneNumber, { target: { value: fakeContact.phoneNumber } });

    expect(screen.getByTestId('email')).toHaveValue(fakeContact.email);
    expect(screen.getByTestId('firstName')).toHaveValue(fakeContact.firstName);
    expect(screen.getByTestId('lastName')).toHaveValue(fakeContact.lastName);
    expect(screen.getByTestId('phoneNumber')).toHaveValue(fakeContact.phoneNumber);
  });
});
