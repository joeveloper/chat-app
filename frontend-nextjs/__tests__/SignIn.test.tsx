import SignIn from '@/app/(auth)/signin/page';
import { useAuth } from '@/hooks/useAuth';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@/hooks/useAuth');

describe('SignIn Page', () => {
  it('renders form and handles input', () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: () => ({
        mutate: jest.fn(),
        isPending: false,
      }),
    });

    render(<SignIn />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(submitButton).toBeEnabled();
  });
});
