import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type QuizScreenParamList = {
  Quiz: {
    logged: boolean;
    category: number;
    difficulty: string;
    type: string;
  };
  Welcome: undefined;
  UserTab: undefined;
  WallOfFame: undefined;
};

export type QuizScreenProps<T extends keyof QuizScreenParamList> =
  StackScreenProps<QuizScreenParamList, T>;

export type QuizSetupScreenParamList = {
  QuizSetup: undefined;
  Quiz: {
    category: number;
    difficulty: string;
  };
}

export type QuizSetupScreenProps<T extends keyof QuizSetupScreenParamList> =
  StackScreenProps<QuizSetupScreenParamList, T>

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Quiz: { logged: boolean };
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>

export type HomeStackParamList = {
  UserTab: NavigatorScreenParams<UserTabParamList>;
  QuizSetup: undefined;
  Quiz: {
    logged: boolean;
    type: string;
  };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;

export type UserTabParamList = {
  Home: undefined;
  WallOfFame: undefined;
  Profile: undefined;
};

export type UserTabScreenProps<T extends keyof UserTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<UserTabParamList, T>,
    HomeStackScreenProps<keyof HomeStackParamList>
  >;