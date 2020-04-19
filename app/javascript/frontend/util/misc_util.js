export const token = function (xhr) {
  xhr.setRequestHeader(
    "X-CSRF-Token",
    $('meta[name="csrf-token"]').attr("content")
  );
};

export const capitalize = (string, separator = " ") => {
  const wordsArray = string.split(separator).map(word => {
    const chArray = word.split("");
    chArray[0] = chArray[0].toUpperCase();
    return chArray.join("");
  });
  return wordsArray.join(separator);
};

export const getFileExtension = filename => filename.split(".").pop();

export const makeShortTitle = title => {
  if (title.length > 60) {
    return `${title.slice(0, 57)}...`;
  } else {
    return title;
  }
};

export const makeShortString = (string, length) => {
  if (string.length > length) {
    return `${string.slice(0, length)}...`;
  } else {
    return string;
  }
};

export const makeCommentLinks = (commentBody, autocomplete) => {
  const tagRegExp = /\B([@])[\w.-]+(?!\s)[\w-]/g;
  const replacer = match => {
    if (autocomplete[match.slice(1)]) {
      const newStr =
        "<a class=comment-profile-link href=#/users/" +
        match.slice(1) +
        ">" +
        match +
        "</a>";
      return newStr;
    } else {
      return match;
    }
  };
  return commentBody.replace(tagRegExp, replacer);
};

export const replaceParentCommenter = (commenter, body) => {
  const tagRegExp = /^([@])[\w.-]+(?!\s)[\w-]/;
  const parentTag = body.match(tagRegExp);
  if (!commenter) {
    return "";
  } else if (parentTag && parentTag.length > 0) {
    return body.replace(tagRegExp, "@" + commenter);
  } else {
    return "@" + commenter + " " + body;
  }
};
