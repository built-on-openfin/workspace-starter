
import express from "express";
import { randomUUID } from "crypto"
export function init(app: express.Application): void {
const baseUrl = "http://localhost:8080";

// Create a map to store workspace objects
const workspaceStore: Map<string, unknown> = new Map();

// POST endpoint to store workspace object.
app.post('/api/share', express.json(), (request, response) => {
  const id = randomUUID();
  const data = request.body;
  workspaceStore.set(id, data);

  const responseObject = {
    id,
    url: `$${baseUrl}/api/share/${id}`
  };

  response.json(responseObject);
});

// GET endpoint to retrieve workspace object
app.get('/api/share/:id', express.json(), (request, response) => {
  const id = request.params.id;
  const data = workspaceStore.get(id);

  if (!data) {
    return response.status(404).json({ error: 'Workspace not found' });
  }

  response.json(data);
});}
