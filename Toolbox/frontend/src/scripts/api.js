import useFetch from "../hooks/useFetch";

const fetchData = useFetch();

// RESPECTIVE TO THE LOGGED IN USER
export const getAccountInfo = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      `/api/accounts/${accountId}`,
      "GET",
      undefined,
      accessToken
    );

    if (res.ok) {
      // console.log(res.data[0]);
      return res.data[0];
    } else {
      console.error(res.data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getEmployeeInfo = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      `/api/employee/${accountId}`,
      "GET",
      undefined,
      accessToken
    );

    if (res.ok) {
      // console.log(res.data[0]);
      return res.data[0];
    } else {
      console.error(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getEmployeeCurrentTitle = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      `/api/employee/titles/${accountId}?status=ACTIVE`,
      "GET",
      undefined,
      accessToken
    );

    if (res.ok) {
      // console.log(res.data[0]);
      return res.data[0];
    } else {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getEmployeeTitles = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      `/api/employee/titles/${accountId}`,
      "GET",
      undefined,
      accessToken
    );

    if (res.ok) {
      // console.log(res.data);
      return res.data;
    } else {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getLeaveBalance = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      `/api/leaves/balance/${accountId}`,
      "GET",
      undefined,
      accessToken
    );
    if (res.ok) {
      // console.log(res.data);
      return res.data;
    } else {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getLeaveRequest = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      `/api/leave/request/${accountId}`,
      "GET",
      undefined,
      accessToken
    );
    if (res.ok) {
      // console.log(res.data);
      return res.data;
    } else {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getPendingLeaveRequest = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      "/api/leave/approval",
      "POST",
      {
        account_id: accountId,
      },
      accessToken
    );
    if (res.ok) {
      // console.log(res.data);
      return res.data;
    } else {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getEmployeeExpense = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      `/api/expense/${accountId}`,
      "GET",
      undefined,
      accessToken
    );
    if (res.ok) {
      // console.log(res.data);
      return res.data;
    } else {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getPendingExpenseRequest = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      "/api/expense/approval",
      "POST",
      {
        account_id: accountId,
      },
      accessToken
    );
    if (res.ok) {
      // console.log(res.data);
      return res.data;
    } else {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getEmployeeExpenseSummary = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      `/api/expense/summary/${accountId}`,
      "GET",
      undefined,
      accessToken
    );
    if (res.ok) {
      // console.log(res.data);
      return res.data;
    } else {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};

// ALL EMPLOYEES
export const getAllEmployeeInfo = async (accessToken, input) => {
  try {
    // Construct the URL with the input query parameter if provided
    const url = input
      ? `/api/employees/search?input=${encodeURIComponent(input)}`
      : `/api/employees/search`;

    const res = await fetchData(url, "GET", undefined, accessToken);

    if (res.ok) {
      // console.log(res.data);
      return res.data;
    } else {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};
