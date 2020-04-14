import { v4 as uuidv4 } from "uuid";
import DOMPurify from "dompurify";

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

export const makeFilename = filename => {
  const extension = filename.split(".").pop();
  const uuid = uuidv4();
  return uuid.concat(".", extension);
};

export const makeShortTitle = title => {
  if (title.length > 80) {
    return `${title.slice(0, 75)}...`;
  } else {
    return title;
  }
};

export const makeCommentLinks = commentBody => {
  const cleanBody = DOMPurify.sanitize(commentBody);
  const tagRegExp = /\B([@])[\w.-]+(?!\s)[\w-]/g;
  const replacer = match => {
    const newStr =
      "<a class=comment-profile-link href=#/users/" +
      match.slice(1) +
      ">" +
      match +
      "</a>";
    return newStr;
  };
  return cleanBody.replace(tagRegExp, replacer);
};
