import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

// Mock assets
vi.mock('../assets/Left.svg', () => ({ default: 'Left.svg' }));
vi.mock('../assets/Right.svg', () => ({ default: 'Right.svg' }));
vi.mock('../assets/Arrow.svg', () => ({ default: 'Arrow.svg' }));
vi.mock('../assets/SeePass.svg', () => ({ default: 'SeePass.svg' }));
vi.mock('../components/Header.jsx', () => ({ default: () => <div data-testid="header" /> }));

// Mock auth API
vi.mock('../apis/auth.js', () => ({
  login: vi.fn(),
}));

import { login } from '../apis/auth.js';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import Login from './LogIn';

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe('Login - successful login navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('navigates to /home after successful login with accessToken', async () => {
    login.mockResolvedValue({ accessToken: 'abc123', refreshToken: 'ref456' });

    renderLogin();

    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호를 입력해주세요'), 'password123');
    await userEvent.click(screen.getByText('로그인'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('navigates to /home when token is nested under data property', async () => {
    login.mockResolvedValue({ data: { accessToken: 'nested_token', refreshToken: 'nested_ref' } });

    renderLogin();

    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호를 입력해주세요'), 'password123');
    await userEvent.click(screen.getByText('로그인'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('does NOT navigate to the old / route after login', async () => {
    login.mockResolvedValue({ accessToken: 'abc123' });

    renderLogin();

    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호를 입력해주세요'), 'password123');
    await userEvent.click(screen.getByText('로그인'));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalledWith('/');
    });
  });

  it('stores accessToken and refreshToken in localStorage on success', async () => {
    login.mockResolvedValue({ accessToken: 'tok1', refreshToken: 'ref1' });

    renderLogin();

    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호를 입력해주세요'), 'password123');
    await userEvent.click(screen.getByText('로그인'));

    await waitFor(() => {
      expect(localStorage.getItem('accessToken')).toBe('tok1');
      expect(localStorage.getItem('refreshToken')).toBe('ref1');
    });
  });

  it('does not navigate when login returns no accessToken', async () => {
    login.mockResolvedValue({});

    renderLogin();

    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호를 입력해주세요'), 'password123');
    await userEvent.click(screen.getByText('로그인'));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('shows alert and does not navigate on login failure', async () => {
    login.mockRejectedValue({
      response: { data: { message: '이메일 또는 비밀번호를 확인해주세요.' } },
    });

    renderLogin();

    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'wrong@example.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호를 입력해주세요'), 'wrongpw');
    await userEvent.click(screen.getByText('로그인'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalledWith('/home');
    });
  });
});

describe('Login - validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('shows email error message when email is empty', async () => {
    renderLogin();

    await userEvent.click(screen.getByText('로그인'));

    expect(screen.getByText('이메일을 입력해주세요')).toBeInTheDocument();
  });

  it('shows password error message when password is empty', async () => {
    renderLogin();

    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.click(screen.getByText('로그인'));

    expect(screen.getByText('비밀번호를 입력해주세요')).toBeInTheDocument();
  });

  it('shows both error messages when both fields are empty', async () => {
    renderLogin();

    await userEvent.click(screen.getByText('로그인'));

    expect(screen.getByText('이메일을 입력해주세요')).toBeInTheDocument();
    expect(screen.getByText('비밀번호를 입력해주세요')).toBeInTheDocument();
  });
});