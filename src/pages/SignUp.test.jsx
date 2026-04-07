import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

// Mock assets
vi.mock('../assets/Left.svg', () => ({ default: 'Left.svg' }));
vi.mock('../assets/Right.svg', () => ({ default: 'Right.svg' }));
vi.mock('../assets/Arrow.svg', () => ({ default: 'Arrow.svg' }));
vi.mock('../assets/SeePass.svg', () => ({ default: 'SeePass.svg' }));
vi.mock('../assets/openPw.svg', () => ({ default: 'openPw.svg' }));
vi.mock('../components/Header.jsx', () => ({ default: () => <div data-testid="header" /> }));

// Mock auth APIs
vi.mock('../apis/auth.js', () => ({
  sendAuthcode: vi.fn(),
  authCode: vi.fn(),
  signUp: vi.fn(),
}));

import { sendAuthcode, authCode, signUp } from '../apis/auth.js';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import SignUp from './SignUp';

const renderSignUp = () =>
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );

// ── Password visibility toggle (showPw) ──────────────────────────────────────

describe('SignUp - password field visibility toggle (showPw)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('password field is hidden (type=password) by default', () => {
    renderSignUp();
    const pwInput = screen.getByPlaceholderText('비밀번호를 입력해주세요');
    expect(pwInput).toHaveAttribute('type', 'password');
  });

  it('clicking the password eye icon shows the password field (type=text)', async () => {
    renderSignUp();
    const pwInput = screen.getByPlaceholderText('비밀번호를 입력해주세요');
    // The first eye icon belongs to the password field
    const eyeIcons = screen.getAllByAltText('비밀번호 표시');
    await userEvent.click(eyeIcons[0]);
    expect(pwInput).toHaveAttribute('type', 'text');
  });

  it('clicking the password eye icon again hides the password field', async () => {
    renderSignUp();
    const pwInput = screen.getByPlaceholderText('비밀번호를 입력해주세요');
    const eyeIcons = screen.getAllByAltText('비밀번호 표시');
    await userEvent.click(eyeIcons[0]);
    await userEvent.click(eyeIcons[0]);
    expect(pwInput).toHaveAttribute('type', 'password');
  });

  it('password eye icon src changes to ClosePw when password is visible', async () => {
    renderSignUp();
    const eyeIcons = screen.getAllByAltText('비밀번호 표시');
    expect(eyeIcons[0]).toHaveAttribute('src', 'SeePass.svg');
    await userEvent.click(eyeIcons[0]);
    expect(eyeIcons[0]).toHaveAttribute('src', 'openPw.svg');
  });
});

// ── Password confirm field visibility toggle (showCheckPw) ───────────────────

describe('SignUp - confirm password field visibility toggle (showCheckPw)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('confirm password field is hidden (type=password) by default', () => {
    renderSignUp();
    const checkPwInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요');
    expect(checkPwInput).toHaveAttribute('type', 'password');
  });

  it('clicking the confirm password eye icon shows the confirm field (type=text)', async () => {
    renderSignUp();
    const checkPwInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요');
    const eyeIcons = screen.getAllByAltText('비밀번호 표시');
    await userEvent.click(eyeIcons[1]);
    expect(checkPwInput).toHaveAttribute('type', 'text');
  });

  it('confirm password eye icon toggles independently of password eye icon', async () => {
    renderSignUp();
    const pwInput = screen.getByPlaceholderText('비밀번호를 입력해주세요');
    const checkPwInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요');
    const eyeIcons = screen.getAllByAltText('비밀번호 표시');

    // Toggle confirm password only
    await userEvent.click(eyeIcons[1]);
    expect(checkPwInput).toHaveAttribute('type', 'text');
    expect(pwInput).toHaveAttribute('type', 'password');
  });

  it('password and confirm password toggles are fully independent', async () => {
    renderSignUp();
    const pwInput = screen.getByPlaceholderText('비밀번호를 입력해주세요');
    const checkPwInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요');
    const eyeIcons = screen.getAllByAltText('비밀번호 표시');

    // Toggle password only
    await userEvent.click(eyeIcons[0]);
    expect(pwInput).toHaveAttribute('type', 'text');
    expect(checkPwInput).toHaveAttribute('type', 'password');

    // Now toggle confirm password
    await userEvent.click(eyeIcons[1]);
    expect(pwInput).toHaveAttribute('type', 'text');
    expect(checkPwInput).toHaveAttribute('type', 'text');
  });

  it('confirm password eye icon src changes to ClosePw when visible', async () => {
    renderSignUp();
    const eyeIcons = screen.getAllByAltText('비밀번호 표시');
    expect(eyeIcons[1]).toHaveAttribute('src', 'SeePass.svg');
    await userEvent.click(eyeIcons[1]);
    expect(eyeIcons[1]).toHaveAttribute('src', 'openPw.svg');
  });
});

// ── Email input disabled state after verification ────────────────────────────

describe('SignUp - email field disabled after verification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('email input is enabled before verification', () => {
    renderSignUp();
    const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요');
    expect(emailInput).not.toBeDisabled();
  });

  it('email input becomes disabled after email verification succeeds', async () => {
    sendAuthcode.mockResolvedValue({});
    authCode.mockResolvedValue({ data: { ticket: 'verify-ticket-123' } });

    renderSignUp();

    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.click(screen.getByText('코드 발송'));

    await waitFor(() => expect(sendAuthcode).toHaveBeenCalled());

    await userEvent.type(
      screen.getByPlaceholderText('발송된 인증 코드를 입력해주세요'),
      '123456'
    );
    await userEvent.click(screen.getByText('확인'));

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요');
      expect(emailInput).toBeDisabled();
    });
  });

  it('send code button changes to "인증 완료" after verification succeeds', async () => {
    sendAuthcode.mockResolvedValue({});
    authCode.mockResolvedValue({ data: { ticket: 'verify-ticket-456' } });

    renderSignUp();

    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.click(screen.getByText('코드 발송'));

    await waitFor(() => expect(sendAuthcode).toHaveBeenCalled());

    await userEvent.type(
      screen.getByPlaceholderText('발송된 인증 코드를 입력해주세요'),
      '123456'
    );
    await userEvent.click(screen.getByText('확인'));

    await waitFor(() => {
      expect(screen.getByText('인증 완료')).toBeInTheDocument();
      expect(screen.getByText('인증 완료')).toBeDisabled();
    });
  });

  it('"코드 발송" button is visible before verification', () => {
    renderSignUp();
    expect(screen.getByText('코드 발송')).toBeInTheDocument();
    expect(screen.getByText('코드 발송')).not.toBeDisabled();
  });
});

// ── handleSendCode clears messages before validation ─────────────────────────

describe('SignUp - handleSendCode message clearing behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('clears previous error messages before checking email validity', async () => {
    sendAuthcode.mockResolvedValue({});
    authCode.mockResolvedValue({ data: { ticket: 'ticket-abc' } });

    renderSignUp();

    // First, trigger a validation message by clicking without email
    await userEvent.click(screen.getByText('코드 발송'));
    expect(screen.getByText('이메일을 입력해주세요')).toBeInTheDocument();

    // Now send a valid code to set checkMessage
    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.click(screen.getByText('코드 발송'));

    await waitFor(() => {
      // The previous "이메일을 입력해주세요" message should be cleared
      expect(screen.queryByText('이메일을 입력해주세요')).not.toBeInTheDocument();
    });
  });

  it('shows email validation error immediately when email is empty on send', async () => {
    renderSignUp();
    await userEvent.click(screen.getByText('코드 발송'));
    expect(screen.getByText('이메일을 입력해주세요')).toBeInTheDocument();
  });

  it('shows code sent confirmation message when email is valid', async () => {
    sendAuthcode.mockResolvedValue({});

    renderSignUp();

    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.click(screen.getByText('코드 발송'));

    await waitFor(() => {
      expect(screen.getByText('인증 코드가 발송되었습니다!')).toBeInTheDocument();
    });
  });

  it('clears checkMessage at the start of handleSendCode', async () => {
    sendAuthcode.mockResolvedValue({});
    authCode.mockResolvedValue({ data: { ticket: 'ticket' } });

    renderSignUp();

    // Send code and verify
    await userEvent.type(screen.getByPlaceholderText('이메일을 입력해주세요'), 'user@example.com');
    await userEvent.click(screen.getByText('코드 발송'));
    await waitFor(() => expect(sendAuthcode).toHaveBeenCalledTimes(1));

    await userEvent.type(
      screen.getByPlaceholderText('발송된 인증 코드를 입력해주세요'),
      '111111'
    );

    // Simulate wrong code (to get a checkMessage set)
    authCode.mockRejectedValueOnce(new Error('wrong code'));
    await userEvent.click(screen.getByText('확인'));
    await waitFor(() => {
      expect(screen.getByText('번호를 확인해 주세요.')).toBeInTheDocument();
    });

    // Now send code again — checkMessage should clear
    sendAuthcode.mockResolvedValue({});
    await userEvent.click(screen.getByText('코드 발송'));
    await waitFor(() => {
      // After new send, checkMessage is replaced with "인증 코드가 발송되었습니다!"
      expect(screen.getByText('인증 코드가 발송되었습니다!')).toBeInTheDocument();
    });
  });
});

// ── Regression: confirm password toggle bug fix ───────────────────────────────

describe('SignUp - regression: confirm password eye icon was previously toggling showPw', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('toggling confirm-password visibility does not affect password visibility', async () => {
    renderSignUp();
    const pwInput = screen.getByPlaceholderText('비밀번호를 입력해주세요');
    const eyeIcons = screen.getAllByAltText('비밀번호 표시');

    // This was the bug: clicking the confirm-pw icon used to toggle showPw
    await userEvent.click(eyeIcons[1]);
    expect(pwInput).toHaveAttribute('type', 'password'); // should remain unchanged
  });

  it('toggling confirm-password visibility does not affect password eye icon src', async () => {
    renderSignUp();
    const eyeIcons = screen.getAllByAltText('비밀번호 표시');

    await userEvent.click(eyeIcons[1]);
    // Password eye icon should still be SeePass.svg (closed state)
    expect(eyeIcons[0]).toHaveAttribute('src', 'SeePass.svg');
  });
});