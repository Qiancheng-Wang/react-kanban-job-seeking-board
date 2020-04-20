import { v4 as uuidv4 } from "uuid";

export const columns = [
  { id: uuidv4(), value: "NEW", name: "New" },
  { id: uuidv4(), value: "APPLIED", name: "Applied" },
  { id: uuidv4(), value: "VIRTUAL_INTERVIEW", name: "Virtual interview" },
  { id: uuidv4(), value: "TECHNICAL_TEST", name: "Technical interview " },
  { id: uuidv4(), value: "ONSITE_INTERVIEW", name: "Onsite interview" },
  { id: uuidv4(), value: "OFFERED", name: "Offered" },
  { id: uuidv4(), value: "ACCEPTED", name: "Accepted" },
];

export const navbuttons = [
  {
    url: "/kanban",
    state: "kanban",
  },
  {
    url: "/job/add",
    state: "jobadd",
  },
];
