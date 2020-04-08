export const signup = user =>
  $.ajax({
    type: "post",
    url: "api/users",
    data: { user },
  });

export const login = user =>
  $.ajax({
    type: "post",
    url: "api/session",
    data: { user },
  });

export const logout = () =>
  $.ajax({
    type: "delete",
    url: "api/session",
  });
