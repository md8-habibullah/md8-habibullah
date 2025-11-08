// File: app/api/ipinfo/route.js

import { NextResponse } from 'next/server';
import { headers } from 'next/headers'; // Import the headers function

export async function GET(request) {
  // Get the visitor's IP address from the request headers
  const headersList = headers();
  const ip = (headersList.get('x-forwarded-for') || request.ip || '127.0.0.1').split(',')[0].trim();

  try {
    // --- DEVELOPMENT/LOCALHOST HANDLE ---
    // If the IP is localhost, don't call the API.
    // This prevents the 500 error in your dev environment.
    if (ip === '127.0.0.1' || ip === '::1') {
      return NextResponse.json({
        ip: '127.0.0.1',
        country_name: 'Localhost' 
      });
    }
    
    // --- PRODUCTION FETCH ---
    // We pass the specific IP to the API to be looked up
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(5000), 
      next: { revalidate: 0 } 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ipapi.co error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    // If ipapi.co itself returns an error (e.g., rate limit)
    if (data.error) {
        throw new Error(data.reason || 'ipapi.co returned an error');
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("API Route Error:", error.message);
    return NextResponse.json(
      { error: 'Failed to fetch IP information' },
      { status: 500 }
    );
  }
}