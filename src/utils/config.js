// export const BASE_URL = "https://localhost:7266/api";
export const BASE_URL = "https://www.protracking.somee.com/api";
// export const CHAT_SERVICE_URL = "http://localhost:8080";
export const CHAT_SERVICE_URL = "https://qgrwb4z2pf.ap-southeast-1.awsapprunner.com/";

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNSIsIkhldEhhblN0cmluZyI6IjI4LzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NTIzMjAwMDAwMCIsIm5iZiI6MTY2MjMxMDgwMCwiZXhwIjoxNjg1Mzc5NjAwfQ.FtGbsXl4qyqTRfJrunro0mQ7b-tNs8EWbhb7JDTzloE";

export const USER_LOGIN = "USER_LOGIN";

export const IMAGE_BASE_PATH = window.location.protocol + "//" + window.location.host + "/img/";

export const MCE_TOKEN = "jlna2slk6iq6pwlfujwlkjkbd26st78n9exjzjvtncvuxnd6";

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
  SERVER: 500,
};

export const priorityLabels = {
  1: 'Very Low',
  2: 'Low',
  3: 'Medium',
  4: 'High',
  5: 'Critical',
  'Very Low': 1,
  'Low': 2,
  'Medium': 3,
  'High': 4,
  'Critical': 5
};

export const colorPriority = {
  1: 'green',
  2: 'cyan',
  3: 'blue',
  4: 'orange',
  5: 'red',
  'green': 1,
  'cyan': 2,
  'blue': 3,
  'orange': 4,
  'red': 5
};

export const accountTypeMap = {
  1: "Free",
  2: "Standard",
  3: "Premium",
  4: "Enterprise",
  "Free": 1,
  "Standard": 2,
  "Premium": 3,
  "Enterprise": 4
};

export const userLocalStorage = {
  set: (userData) => {
    let userJson = JSON.stringify(userData);
    localStorage.setItem(USER_LOGIN, userJson);
  },
  get: () => {
    let userJson = localStorage.getItem(USER_LOGIN);
    if (userJson !== null) {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  },
  remove: () => {
    localStorage.removeItem(USER_LOGIN);
  },
};
