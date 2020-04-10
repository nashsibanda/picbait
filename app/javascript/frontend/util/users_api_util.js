export const getUsers = data =>
  $.ajax({
    type: "get",
    url: "api/users",
    data,
    error: err => console.log(err),
  });

export const getUser = userId =>
  $.ajax({
    type: "get",
    url: `api/users/${userId}`,
  });
