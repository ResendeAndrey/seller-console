import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
};

export type Opportunity = Omit<Lead, "status">;

// leads generator

const names = [
  "Joaquim",
  "Maria",
  "João",
  "Carla",
  "Pedro",
  "Ana",
  "Lucas",
  "Fernanda",
  "Rafael",
  "Juliana",
  "John"
];
const companies = [
  "ACME Corp",
  "Tech Ltd",
  "Soft Inc",
  "Global Solutions",
  "NextGen",
  "Skyline",
  "Innova",
  "Future Labs"
];
const statuses = ["New", "Contacted", "Qualified"];
const sources = [
  "Website",
  "LinkedIn",
  "Referral",
  "Email Campaign",
  "Cold Call"
];

function generateEmail(name: string, company: string) {
  return `${name.toLowerCase()}.${company
    .split(" ")[0]
    .toLowerCase()}@example.com`;
}

const leads = Array.from({ length: 150 }, () => {
  const name = names[Math.floor(Math.random() * names.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const source = sources[Math.floor(Math.random() * sources.length)];
  const score = Math.floor(Math.random() * 101);

  return {
    id: uuidv4(),
    name,
    company,
    status,
    email: generateEmail(name, company),
    score,
    source
  };
});

const app = express();
const PORT = 4000;
const DELAY_INTERVAL = 1100;

app.use(cors());
app.use(express.json());

// get leads route

app.get("/api/leads", (req, res) => {
  const { page = 1, limit = 20, status, search } = req.query;

  let filteredData = [...leads];
  if (status && status !== "All") {
    filteredData = filteredData.filter(
      (lead) => lead.status.toLowerCase() === String(status).toLowerCase()
    );
  }

  if (search) {
    const lowerSearch = String(search).toLowerCase();
    filteredData = filteredData.filter(
      (lead) =>
        lead.name.toLowerCase().includes(lowerSearch) ||
        lead.company.toLowerCase().includes(lowerSearch)
    );
  }

  const startIndex = (Number(page) - 1) * Number(limit);
  const paginated = filteredData.slice(startIndex, startIndex + Number(limit));

  setTimeout(() => {
    res.json({
      page: Number(page),
      totalPages: Math.ceil(filteredData.length / Number(limit)),
      totalItems: filteredData.length,
      data: paginated
    });
  }, DELAY_INTERVAL);
});

// update lead //api/leads/:id

app.patch("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const { email, status } = req.body;

  const leadIndex = leads.findIndex((lead) => lead.id === id);

  if (leadIndex === -1) {
    return res.status(404).json({ message: "Lead not found" });
  }

  if (email) leads[leadIndex].email = email;
  if (status) leads[leadIndex].status = status;

  setTimeout(() => {
    res.json(leads[leadIndex]);
  }, DELAY_INTERVAL);
});

const opportunities: Opportunity[] = [];

// get /opportunities

app.get("/api/opportunities", (req, res) => {
  const { page = 1, limit = 20, search } = req.query;

  let filteredData = [...opportunities];

  if (search) {
    const lowerSearch = String(search).toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.company.toLowerCase().includes(lowerSearch)
    );
  }

  const startIndex = (Number(page) - 1) * Number(limit);
  const paginated = filteredData.slice(startIndex, startIndex + Number(limit));

  setTimeout(() => {
    res.json({
      page: Number(page),
      totalPages: Math.ceil(filteredData.length / Number(limit)),
      totalItems: filteredData.length,
      data: paginated
    });
  }, DELAY_INTERVAL);
});

app.post("/api/opportunities", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "leadId is required" });
  }

  const leadIndex = leads.findIndex((l) => l.id === id);
  if (opportunities.find((o) => o.id === id)) {
    return res
      .status(400)
      .json({ error: "Lead already converted to opportunity" });
  }
  if (leadIndex === -1) {
    return res.status(404).json({ error: "Lead not found" });
  }

  const lead = leads[leadIndex];

  leads.splice(leadIndex, 1);

  const newOpportunity = {
    id: lead.id,
    name: lead.name,
    company: lead.company,
    email: lead.email,
    score: lead.score,
    source: lead.source
  };

  opportunities.push(newOpportunity);

  setTimeout(() => {
    res.status(201).json(newOpportunity);
  }, DELAY_INTERVAL);
});

// post /opportunity

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
