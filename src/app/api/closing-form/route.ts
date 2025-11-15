import { NextResponse } from 'next/server';
import { addCustomer } from '@/data/customerData';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email } = data;

    if (!name || !email) {
      return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
    }

    // Add the new customer using the simulated database function
    const newCustomer = addCustomer({ name, email });
    console.log('New customer created:', newCustomer);

    return NextResponse.json({ message: 'Customer created successfully', customer: newCustomer }, { status: 201 });
  } catch (error) {
    console.error('Error processing closing form submission:', error);
    return NextResponse.json({ message: 'Failed to create customer' }, { status: 500 });
  }
}
