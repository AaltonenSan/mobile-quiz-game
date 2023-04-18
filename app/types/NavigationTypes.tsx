import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type QuizScreenParamList = {
  Quiz: undefined;
};

export type QuizScreenProps<T extends keyof QuizScreenParamList> =
  StackScreenProps<QuizScreenParamList, T>;

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Quiz: QuizScreenProps<'Quiz'>;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>

export type HomeStackParamList = {
  UserTab: NavigatorScreenParams<UserTabParamList>;
  Quiz: QuizScreenProps<'Quiz'>;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;

export type UserTabParamList = {
  Home: undefined;
  Highscores: undefined;
  Profile: undefined;
};

export type UserTabScreenProps<T extends keyof UserTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<UserTabParamList, T>,
    HomeStackScreenProps<keyof HomeStackParamList>
  >;