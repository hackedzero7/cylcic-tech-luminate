import { format } from "date-fns";

function formatDate(date) {
  let formattedDate = format(date, "MMMM dd, yyyy hh:mm: a");
  return formattedDate;
}

export default formatDate;
