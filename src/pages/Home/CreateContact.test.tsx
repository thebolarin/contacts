// import { render, screen } from '@testing-library/react';
import '../../../matchMedia'; 

import { fireEvent, screen } from '@testing-library/dom';
import ReactDOM from 'react-dom';
import CreateContact from '.';


describe('<CreateContact />', () => {
  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateContact />, div);
    document.body.appendChild(div);
    screen.debug();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

// test('CreateContact, given credentials, returns enabled submit button', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<CreateContact />, div);
//   document.body.appendChild(div);
//   screen.debug();
//   // const username = screen.getByRole('textbox', { name: /username/i });
//   // const password = screen.getByLabelText(/password/i);
//   // const rememberMe = screen.getByRole('checkbox');
//   // const loginBtn = screen.getByRole('button', { name: /login/i });

//   // const fakeUser = {
//   //   username: 'test user',
//   //   password: '123password',
//   // };
//   // fireEvent.change(username, { target: { value: fakeUser.username } });
//   // fireEvent.change(password, { target: { value: fakeUser.password } });
//   // fireEvent.click(rememberMe);

//   // expect(screen.getByTestId('form')).toHaveFormValues({
//   //   username: fakeUser.username,
//   //   password: fakeUser.password,
//   //   rememberMe: true,
//   // });

//   // expect(loginBtn).not.toBeDisabled();

//   // // Test cleanup
//   // div.remove();
// });
