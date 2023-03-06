import axios from "axios";

const BASE_SUBJECT_URL = "https://openlibrary.org/subjects/";
const BASE_SEARCH_URL = "https://openlibrary.org/search.json";

const getBooksBySubject = async (queryParams: {
  subject: string;
  pagination: { limit: number; offset: number };
}) => {
  const { subject, pagination } = queryParams;
  const { limit, offset } = pagination;
  if (pagination.offset !== 0) {
    const call = await axios.get(
      BASE_SUBJECT_URL +
        `${subject.toLocaleLowerCase()}.json?limit=${limit}&offset=${offset}`
    );
    return call;
  } else if (!localStorage.getItem(subject.toLocaleLowerCase())) {
    const call = await axios.get(
      BASE_SUBJECT_URL +
        `${subject.toLocaleLowerCase()}.json?limit=${limit}&offset=${offset}`
    );
    if (call.data.works.length === 0)
      localStorage.setItem(subject.toLocaleLowerCase(), JSON.stringify(call));
    return call;
  }
  return JSON.parse(localStorage.getItem(subject.toLocaleLowerCase()) || "");
};

const getBooks = async (queryParams: {
  query: string;
  pagination: { limit: number; offset: number };
}) => {
  const { query, pagination } = queryParams;
  const { limit, offset } = pagination;
  if (pagination.offset !== 0) {
    const call = await axios.get(
      BASE_SEARCH_URL + `?q=${query}&limit=${limit}&offset=${offset}`
    );
    return call;
  } else if (!localStorage.getItem(query.toLocaleLowerCase())) {
    const call = await axios.get(
      BASE_SEARCH_URL + `?q=${query}&limit=${limit}&offset=${offset}`
    );
    if (call.data.docs.length === 0)
      localStorage.setItem(query.toLocaleLowerCase(), JSON.stringify(call));
    return call;
  }
  return JSON.parse(localStorage.getItem(query.toLocaleLowerCase()) || "");
};

export { getBooks, getBooksBySubject };
