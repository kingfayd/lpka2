import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        let settings = await prisma.contactSettings.findFirst();
        
        if (!settings) {
            settings = await prisma.contactSettings.create({
                data: {
                    email: "lpkatangerang1@gmail.com",
                    whatsappNumber: "6281386241976"
                }
            });
        }
        
        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error fetching contact settings:", error);
        return NextResponse.json(
            { error: "Failed to fetch settings" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { email, whatsappNumber, instagram, facebook, twitter, tiktok } = body;

        if (!email || !whatsappNumber) {
            return NextResponse.json(
                { error: "Email and WhatsApp number are required" },
                { status: 400 }
            );
        }

        let settings = await prisma.contactSettings.findFirst();

        const data = {
            email,
            whatsappNumber,
            instagram,
            facebook,
            twitter,
            tiktok
        };

        if (settings) {
            settings = await prisma.contactSettings.update({
                where: { id: settings.id },
                data
            });
        } else {
            settings = await prisma.contactSettings.create({
                data
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error updating contact settings:", error);
        return NextResponse.json(
            { error: "Failed to update settings" },
            { status: 500 }
        );
    }
}
