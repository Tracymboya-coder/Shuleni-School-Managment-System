import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/slices/authSlice';
import classesReducer from '../../store/slices/classesSlice';
import usersReducer from '../../store/slices/usersSlice';
import resourcesReducer from '../../store/slices/resourcesSlice';
import Login from '../Login';

function renderWithStore(ui) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      classes: classesReducer,
      users: usersReducer,
      resources: resourcesReducer,
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

const fillLoginForm = (email, password) => {
  fireEvent.change(screen.getByPlaceholderText('you@school.ac.ke'), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText('••••••••'), {
    target: { value: password },
  });
};

describe('Login screen', () => {
  const navigate = jest.fn();
  const setRole = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('shows a validation error when submitting with empty fields', () => {
    renderWithStore(<Login navigate={navigate} setRole={setRole} />);
    fireEvent.click(screen.getByText('Sign in'));
    expect(screen.getByText('Please enter your email and password.')).toBeInTheDocument();
  });

  it('logs in successfully and navigates to the right dashboard', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'fake-jwt',
        user: {
          id: '1',
          name: 'Alice Kamau',
          email: 'alice@makini.ac.ke',
          role: 'ADMIN',
        },
      }),
    });

    renderWithStore(<Login navigate={navigate} setRole={setRole} />);
    fillLoginForm('alice@makini.ac.ke', 'password123');
    fireEvent.click(screen.getByText('Sign in'));

    await waitFor(() => expect(setRole).toHaveBeenCalledWith('admin'));
    expect(navigate).toHaveBeenCalledWith('admin-dashboard');
  });

  it('shows the server error message when login fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Invalid school, email, or password' }),
    });

    renderWithStore(<Login navigate={navigate} setRole={setRole} />);
    fillLoginForm('alice@makini.ac.ke', 'wrongpass');
    fireEvent.click(screen.getByText('Sign in'));

    await waitFor(() => {
      expect(screen.getByText('Invalid school, email, or password')).toBeInTheDocument();
    });
  });
});
