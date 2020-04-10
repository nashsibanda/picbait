import { v4 as uuidv4 } from "uuid";

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
