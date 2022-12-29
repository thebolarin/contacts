import { fireEvent, screen } from '@testing-library/dom';
import CreateContact from './CreateContact';
import '../../matchMedia'
import CustomModal from '../../components/Modal/CustomModal';
import { App } from '../../App';
import { faker } from '@faker-js/faker';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

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


describe('<CreateContact />', () => {
    it('renders correctly', () => {
        render(
            <App>
                <CreateContact>
                    <CustomModal> </CustomModal>
                </CreateContact>
            </App>, container);

        fireEvent.click(screen.getByText("Add a New Contact"))
        expect(screen.getByText('Create Contact')).toBeInTheDocument();
    });

    it('Given valid credentials, returns a non empty create contact form values', async () => {
        await act(async () => {
            render(
                <App>
                    <CreateContact>
                        <CustomModal> </CustomModal>
                    </CreateContact>
                </App>, container);
        });

        await fireEvent.click(screen.getByText("Add a New Contact"))
        expect(screen.getByText('Create Contact')).toBeInTheDocument();

        const email = screen.getByTestId('email');
        const firstName = screen.getByTestId('firstName');
        const lastName = screen.getByTestId('lastName')
        const phoneNumber = screen.getByTestId('phoneNumber')

        expect(screen.getByTestId('form')).toBeInTheDocument();

        expect(screen.getByTestId('email')).toHaveValue("");
        expect(screen.getByTestId('firstName')).toHaveValue("");
        expect(screen.getByTestId('lastName')).toHaveValue("");
        expect(screen.getByTestId('phoneNumber')).toHaveValue("");

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