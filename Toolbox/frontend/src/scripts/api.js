import useFetch from "../hooks/useFetch";

const fetchData = useFetch();

export const getAccountInfo = async (accountId, accessToken) => {
  try {
    const res = await fetchData(
      `/api/accounts/${accountId}`,
      "GET",
      undefined,
      accessToken
    );

    if (res.ok) {
      console.log(res.data[0]);
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
      console.log(res.data[0]);
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
      console.log(res.data[0]);
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
      console.log(res.data);
      return res.data;
    } else {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error.message);
  }
};