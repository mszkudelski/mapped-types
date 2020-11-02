// keyof - przykłady

type Keys = keyof {
  name: string;
  age: number;
}; // 'name' | 'age'

const person = { name: "Jan", age: 95 };
type KeysPerson = keyof typeof person; // 'name' | 'age'

// Record - przykłady

type ConfigFields = "env" | "db_host";
type Config = Record<ConfigFields, string>;

type Languages = "pl" | "en";
type Dictionary<Langs extends string> = Record<string, Record<Langs, string>>;

const dictionary: Dictionary<Languages> = {
  WORD: {
    pl: "słowo",
    en: "word",
    de: "" // error!
  }
};

// operator minus - przykład

type ReadWrite<T> = { -readonly [P in keyof T]: T[P] };

// Required i Partial - przykład

interface User {
  id?: string;
  name: string;
  age: number;
}

declare function editUser(user: Required<User>);
declare function patchUser(user: Partial<User>);

// Pick i Omit - przykład

type RequiredUserId = Required<Pick<User, "id">>;

declare function editUser(user: User & RequiredUserId);
declare function patchUser(user: Partial<User> & RequiredUserId);

// bardziej generyczna wersja:

type RequireFields<T, K extends keyof T> = Required<Pick<T, K>>;

type RequireOnly<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

declare function editUser(user: User & RequireFields<User, "id">);
declare function patchUser(user: RequireOnly<User, "id">);

// custom mapped type - przykład

interface UserData {
  city: string;
  street: string;
  postCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  secondaryPhoneNumber: string;
  companyName: string;
}

type MaxLengths<T extends {}> = { readonly [P in keyof T]: number };

class Component {
  readonly formValidationMaxLengths: MaxLengths<UserData> = Object.freeze({
    city: 20,
    street: 50,
    postCode: 6,
    firstName: 20,
    lastName: 20,
    phoneNumber: 16,
    secondaryPhoneNumber: 20,
    companyName: 30
  });
}

// alternatywna wersja:

class ComponentAlt {
  readonly formValidationMaxLengths = Object.freeze<
    Record<keyof UserData, number>
  >({
    city: 20,
    street: 50,
    postCode: 6,
    firstName: 20,
    lastName: 20,
    phoneNumber: 16,
    secondaryPhoneNumber: 20,
    companyName: 30
  });
}
