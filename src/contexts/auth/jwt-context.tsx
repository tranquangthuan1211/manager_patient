import type { FC, ReactNode } from "react";
import { createContext, useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import  UsersApi  from "src/api/users";
import type { User } from "src/types/users";
import { Issuer } from "src/utils/auth";
import CookieHelper, { CookieKeys } from "src/utils/cookie-helper";
import { useRouter } from "next/router";
// import { paths } from "src/paths";
// import { getOfficerUnitType } from "src/utils/get-officer-unit-type";

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

enum ActionType {
  UPDATE = "UPDATE",
  INITIALIZE = "INITIALIZE",
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGN_OUT = "SIGN_OUT",
}

type UpdateAction = {
  type: ActionType.UPDATE;
  payload: {
    user: Partial<User>;
  };
};

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    user: User;
  };
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: {
    user: User;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action =
  | InitializeAction
  | SignInAction
  | SignUpAction
  | SignOutAction
  | UpdateAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<ActionType, Handler> = {
  UPDATE: (state: State, action: UpdateAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      user: state.user ? { ...state.user, ...user } : null,
    };
  },
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  SIGN_IN: (state: State, action: SignInAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_UP: (state: State, action: SignUpAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export interface AuthContextType extends State {
  issuer: Issuer.JWT;
  updateUser: (user: Partial<User>) => void;
  signIn: (email: string, password: string) => Promise<User | undefined>;
  signUp: (
    email: string,
    name: string,
    phone: string,
    password: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  updateUser: () => {},
  issuer: Issuer.JWT,
  signIn: () => Promise.resolve(undefined),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const updateUser = useCallback(
    (user: Partial<User>) => {
      dispatch({
        type: ActionType.UPDATE,
        payload: {
          user,
        },
      });
    },
    [dispatch]
  );

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const accessToken = CookieHelper.getItem("token");
      if (accessToken) {
        const response = await UsersApi.me();
        // console.log(respone.data)
        const user = response.data;
        if (!user) {
          throw new Error("Ger user failed.");
        }
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
        // const officerUnitType = await getOfficerUnitType(user);
        if (
          (user.role == "admin") 
          // &&
          // !router.pathname.startsWith("/dashboard")
        ) {
          router.replace("/");
        } else if (
          user.role == "patient" 
          // &&
          // !router.pathname.startsWith("/can-bo") &&
          // officerUnitType == "Phòng"
        ) {
          router.replace('/benh-nhan');        
        } else if (
          user.role == "doctor" 
          // &&
          // !router.pathname.startsWith("/can-bo") &&
          // officerUnitType == "Phòng"
        ) {
          router.replace('/bac-si');
        }else if (
          user.role == "manager" 
          // &&
          // !router.pathname.startsWith("/can-bo") &&
          // officerUnitType == "Phòng"
        ) {
          router.replace('/');
        }
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [router, dispatch]);

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<User> => {
      const accessToken = CookieHelper.getItem(CookieKeys.TOKEN);
      const response = await UsersApi.signIn({ username: email, password });
      // console.log(response);
      CookieHelper.setItem(CookieKeys.TOKEN, response.token);
      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user: response.data,
        },
      });
      return response.data;
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (
      email: string,
      name: string,
      phone: string,
      password: string
    ): Promise<void> => {
      const { accessToken } = await UsersApi.signUp({
        email,
        name,
        password,
        phone,
      });
      // const user = await UsersApi.me({ accessToken });

      // sessionStorage.setItem(STORAGE_KEY, accessToken);

      // dispatch({
      //   type: ActionType.SIGN_UP,
      //   payload: {
      //     user,
      //   },
      // });
    },
    []
  );

  const signOut = useCallback(async (): Promise<void> => {
    CookieHelper.removeItem(CookieKeys.TOKEN);
    dispatch({ type: ActionType.SIGN_OUT });
    // router.push(paths.login);
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.JWT,
        updateUser,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
