import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserSummary, getCalendars } from './user';

// Mock the instance module
vi.mock('./instance', () => ({
  default: {
    get: vi.fn(),
  },
}));

import instance from './instance';

describe('getUserSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('returns response data on successful request', async () => {
    const mockData = { name: '홍길동', email: 'test@example.com' };
    instance.get.mockResolvedValue({ data: mockData });

    const result = await getUserSummary();

    expect(instance.get).toHaveBeenCalledWith('/api/v1/users/me/summary');
    expect(result).toEqual(mockData);
  });

  it('throws error and logs when request fails', async () => {
    const mockError = {
      response: { status: 401, data: { message: '인증 실패' } },
      message: '인증 실패',
    };
    instance.get.mockRejectedValue(mockError);

    await expect(getUserSummary()).rejects.toEqual(mockError);
    expect(console.error).toHaveBeenCalledWith('사용자 요약 조회 실패', {
      status: 401,
      message: '인증 실패',
    });
  });

  it('uses error.message as fallback when response data has no message', async () => {
    const mockError = {
      response: { status: 500, data: {} },
      message: 'Network Error',
    };
    instance.get.mockRejectedValue(mockError);

    await expect(getUserSummary()).rejects.toEqual(mockError);
    expect(console.error).toHaveBeenCalledWith('사용자 요약 조회 실패', {
      status: 500,
      message: 'Network Error',
    });
  });

  it('handles error with no response object', async () => {
    const mockError = { message: 'Network Error' };
    instance.get.mockRejectedValue(mockError);

    await expect(getUserSummary()).rejects.toEqual(mockError);
    expect(console.error).toHaveBeenCalledWith('사용자 요약 조회 실패', {
      status: undefined,
      message: 'Network Error',
    });
  });
});

describe('getCalendars', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('returns response data on successful request', async () => {
    const mockData = [{ id: 1, date: '2024-01' }];
    instance.get.mockResolvedValue({ data: mockData });

    const result = await getCalendars('2024-01');

    expect(instance.get).toHaveBeenCalledWith('/api/v1/users/me/calendars', {
      params: { yearMonth: '2024-01' },
    });
    expect(result).toEqual(mockData);
  });

  it('passes yearMonth as a query param', async () => {
    instance.get.mockResolvedValue({ data: [] });

    await getCalendars('2025-12');

    expect(instance.get).toHaveBeenCalledWith('/api/v1/users/me/calendars', {
      params: { yearMonth: '2025-12' },
    });
  });

  it('throws error and logs when request fails', async () => {
    const mockError = {
      response: { status: 403, data: { message: '권한 없음' } },
      config: { headers: { Authorization: 'Bearer token' } },
    };
    instance.get.mockRejectedValue(mockError);

    await expect(getCalendars('2024-01')).rejects.toEqual(mockError);
    expect(console.error).toHaveBeenCalledWith('상태 코드:', 403);
    expect(console.error).toHaveBeenCalledWith('에러 메시지:', { message: '권한 없음' });
    expect(console.error).toHaveBeenCalledWith('요청 헤더:', { Authorization: 'Bearer token' });
  });

  it('handles error with no response or config', async () => {
    const mockError = { message: 'timeout' };
    instance.get.mockRejectedValue(mockError);

    await expect(getCalendars('2024-01')).rejects.toEqual(mockError);
    expect(console.error).toHaveBeenCalledWith('상태 코드:', undefined);
    expect(console.error).toHaveBeenCalledWith('에러 메시지:', undefined);
    expect(console.error).toHaveBeenCalledWith('요청 헤더:', undefined);
  });

  it('works when yearMonth is undefined', async () => {
    instance.get.mockResolvedValue({ data: [] });

    const result = await getCalendars(undefined);

    expect(instance.get).toHaveBeenCalledWith('/api/v1/users/me/calendars', {
      params: { yearMonth: undefined },
    });
    expect(result).toEqual([]);
  });
});