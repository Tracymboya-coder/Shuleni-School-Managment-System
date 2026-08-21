import authReducer, { logout, login } from '../authSlice';
describe('authSlice', () => {
  const baseState = {
    token: null,
    user: null,
    school: null,
    status: 'idle',
    error: null
  };
  it('returns the initial state for an unknown action', () => {
    expect(authReducer(undefined, {
      type: 'unknown'
    })).toMatchObject({
      token: null,
      user: null
    });
  });
  it('sets status to loading on login.pending', () => {
    const state = authReducer(baseState, {
      type: login.pending.type
    });
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });
  it('stores the token and user on login.fulfilled', () => {
    const payload = {
      token: 'abc123',
      user: {
        id: '1',
        name: 'Alice',
        email: 'a@b.com',
        role: 'ADMIN'
      }
    };
    const state = authReducer(baseState, {
      type: login.fulfilled.type,
      payload
    });
    expect(state.token).toBe('abc123');
    expect(state.user?.name).toBe('Alice');
    expect(state.status).toBe('idle');
  });
  it('stores the error message on login.rejected', () => {
    const state = authReducer(baseState, {
      type: login.rejected.type,
      payload: 'Invalid credentials'
    });
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Invalid credentials');
  });
  it('clears token and user on logout', () => {
    const loggedIn = {
      ...baseState,
      token: 'abc123',
      user: {
        id: '1',
        name: 'Alice',
        email: 'a@b.com',
        role: 'ADMIN'
      }
    };
    const state = authReducer(loggedIn, logout());
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});