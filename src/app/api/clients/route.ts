import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { Client } from '@/types'; 
const getClientsFilePath = () => {
  return path.join(process.cwd(), 'src', 'data', 'clients.json');
};


export async function GET() {
  try {
    const filePath = getClientsFilePath();
    const fileContent = await fs.readFile(filePath, 'utf8');
    const clients: Client[] = JSON.parse(fileContent);
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.error('Error reading clients.json:', error);
    return NextResponse.json({ message: 'Failed to load clients' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const newClientData: Omit<Client, 'id'> = await request.json();

    const filePath = getClientsFilePath();
    const fileContent = await fs.readFile(filePath, 'utf8');
    const clients: Client[] = JSON.parse(fileContent);

    const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;

    const clientToAdd: Client = {
      ...newClientData,
      id: newId,
      dateCreation: newClientData.dateCreation || new Date().toISOString().split('T')[0],
    };

    clients.push(clientToAdd);

    await fs.writeFile(filePath, JSON.stringify(clients, null, 2), 'utf8'); 

    return NextResponse.json(clientToAdd, { status: 201 });
  } catch (error) {
    console.error('Error adding client:', error);
    return NextResponse.json({ message: 'Failed to add client' }, { status: 500 });
  }
}